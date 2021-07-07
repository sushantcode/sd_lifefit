import requests
import base64

#################### Exchange refresh token for new Tokens ##########################
def getNewTokens(refreshToken):
    endPoint = 'https://api.fitbit.com/oauth2/token'
    client_id = '22C2J2'
    client_secret = 'aea53919e7de0f0ded7e30ea9fa2180b'
    combinedStr = client_id + ':' + client_secret
    encodedBytes = base64.b64encode(combinedStr.encode('utf-8'))
    encodedStr = str(encodedBytes, 'utf-8')
    header = {'Authorization': 'Basic ' + encodedStr, 'Content-Type': 'application/x-www-form-urlencoded'}
    parameters = {'grant_type': 'refresh_token', 'refresh_token': refreshToken}
    response = requests.post(endPoint, headers=header, params=parameters)
    if response.status_code == 200:
        jsonRespone = response.json()
        return jsonRespone
    else:
        return None