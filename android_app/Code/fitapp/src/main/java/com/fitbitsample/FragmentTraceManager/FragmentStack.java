package com.fitbitsample.FragmentTraceManager;

import androidx.fragment.app.Fragment;

import java.util.Stack;
/*
    This class handles the fragments created to view the received and parsed datas
 */
public class FragmentStack {
    private Stack<Fragment> fragmentStack;

    //    WeakReference<Fragment>
    public FragmentStack() {
        this.fragmentStack = new Stack<>();
    }

    public Stack<Fragment> getFragmentStack() {
        return this.fragmentStack;
    }

    public Fragment getLastFragmentFromStack() {
        return this.fragmentStack.lastElement();
    }

    public void addFragmentToStack(Fragment fragment) {
        this.fragmentStack.push(fragment);
    }

    public void pauseLastFragmentFromStack() {
        this.fragmentStack.lastElement().onPause();
    }

    public Fragment removeLastFragmentFromStack() {
        return this.fragmentStack.pop();
    }

    public int fragmentStackSize() {
        return this.fragmentStack.size();
    }



}