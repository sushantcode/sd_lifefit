package com.fitbitsample.FragmentTraceManager;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
/*
    This class handles the fragments created to view the received and parsed datas
 */

public class FragmentStackHandler {
    private FragmentManager fragmentManager;
    private FragmentStack fragmentStack;

    public FragmentStackHandler(FragmentManager fragmentManager, FragmentStack fragmentStack) {
        this.fragmentManager = fragmentManager;
        this.fragmentStack = fragmentStack;
    }

    public void startAndAddFragmentAndCloseAllLastFragmentInStack(Fragment fragment, int container) {
        FragmentTransaction ft = fragmentManager.beginTransaction();
        ft.add(container, fragment);
        if(fragmentStack.getFragmentStack().size() > 0) {
            fragmentStack.pauseLastFragmentFromStack();
            ft.hide(fragmentStack.getLastFragmentFromStack());
            while (true) {
                if (fragmentStack.fragmentStackSize() > 0) {
                    ft.remove(fragmentStack.removeLastFragmentFromStack());
                } else {
                    break;
                }
            }
        }
        fragmentStack.addFragmentToStack(fragment);
        ft.commitAllowingStateLoss();
    }

    public Fragment getLastFragment() {
        if (fragmentStack.fragmentStackSize() == 0) {
            return null;
        }
        return fragmentStack.getLastFragmentFromStack();
    }
}