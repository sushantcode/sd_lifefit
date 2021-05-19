from flask import Flask, render_template, request, session, redirect, url_for
from flask import make_response

from common.database import Database
from models.blog import Blog
from models.user import User
from models.post import Post


# tell python we are creating a flask application
# create a class of Flask
app = Flask(__name__)
# create a secret_key for session to be able to work
app.secret_key = "jsaca0254687d9etgfrwgrwvhjigfewgv587986grwg05658grwg"


# define the first end-point -- www/mysite.con/api/
@app.route('/index')
@app.route('/')
def home_template():
    if "email" not in session:
        return render_template('index.html')
    return render_template('index.html', email=session['email'])

# define the first end-point -- www/mysite.con/api/
@app.route('/portal')
@app.route('/portal/')
def portal():
    if "email" not in session:
        return render_template('dashboard.html')
    return render_template('dashboard.html', email=session['email'])


# define the second end-point -- www/mysite.com/api/login
@app.route('/login')
def login_template():
    # return 'Hello, world'
    if "email" not in session:
        return render_template('auth-login.html')
    else:
        return redirect(url_for("portal"))


# define the second end-point -- www/mysite.com/api/login
@app.route('/logout')
def logout():
    # return 'Hello, world'
    if "email" not in session:
        return redirect( ("index"))
    else:
        del session['email']
        return redirect(url_for("index"))


# define another end-point -- www/mysite.com/api/register
@app.route('/register')
def registe_template():
    # return 'Hello, world'
    if "email" not in session:
        return render_template('auth-register.html')
    else:
        return redirect(url_for("portal"))


# we have to initialize the database
# use Flask dec
@app.before_first_request
def initialize_database():
    Database.initialize()


# define another end-point
# login user
@app.route('/auth/login', methods=['POST'])
def login_user():
    print("Login User")
    email = request.form['email']
    password = request.form['password']

    # check if email,and password match
    if User.login_valid(email, password):
        # if matched save the email in session
        print("Valid User")
        User.login(email)
    else:
        print("Invalid User")
        session['email'] = None

    # redirect the user on a profile.html page, with email on the session saved
    return render_template('dashboard.html', email=session['email'], password=password)


# register user
@app.route('/auth/register', methods=['POST'])
def register_user():
    email = request.form['email']
    password = request.form['password']

    User.register(email, password)

    return render_template('profile.html', email=session['email'])


# list the blogs belonging to an user or author
@app.route('/blogs/<string:user_id>')
@app.route('/blogs')
def user_blogs(user_id=None):

    # find the user either by user_id given or by email
    # stored in session
    if user_id is not None:
        user = User.get_by_id(user_id)
    else:
        user = User.get_by_email(session['email'])

    # get all the blogs associated with this user
    blogs = user.get_blogs()

    return render_template('user_blogs.html', blogs=blogs, email=user.email)


# list all the posts that are in a blog
@app.route('/posts/<string:blog_id>')
def blog_posts(blog_id):
    blog = Blog.from_mongo(blog_id)
    posts = blog.get_posts()

    return render_template('posts.html', blog_title=blog.title, blog_id=blog._id, posts=posts)

# create a new blog
@app.route('/blogs/new', methods=['GET', 'POST'])
def create_new_blog():
    # check if the user has just landed on the page, or has already press submit button
    if request.method == 'GET':
        return render_template('new_blog.html')
    else:
        title = request.form['title']
        description = request.form['description']
        author = request.form['author']
        user = User.get_by_email(session['email'])
        author_id = user._id

        # save to db the new_blog
        new_blog = Blog(author, title, description, author_id)
        new_blog.save_to_mongo()
        new_blog = None
        # return to user_blogs()
        return make_response(user_blogs(user._id))


@app.route('/posts/new/<string:blog_id>', methods=['GET', 'POST'])
def create_new_post(blog_id):
    if request.method == 'GET':
        return render_template('new_post.html', blog_id=blog_id)
    else:
        author = request.form['author']
        title = request.form['title']
        content = request.form['content']

        new_post = Post(title, content, author, blog_id)
        new_post.save_to_mongo()

        return make_response(blog_posts(blog_id))

# in order to work this app
if __name__ == '__main__':
    app.run(port=4995)
    # we could set other port
    # app.run(port=4000)

