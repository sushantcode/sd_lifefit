package com.fitbitsample.FragmentTraceManager;


import com.fitbitsample.BuildConfig;

import java.util.logging.Level;
import java.util.logging.Logger;
/*
    This class handles the printing datas on string builded from API calss in logcat
 */

public class Trace {

    private static final boolean FINAL_CONSTANT_IS_LOCAL = true;
    private static int LOG_LEVEL = 0; // 0 - Release, 1 - Debug
    private static Logger logger = Logger.getLogger("[app]");

    static {
        if (isDebugMode()) {
            LOG_LEVEL = 1;
        }
    }

    private static boolean isDebugMode() {
        return BuildConfig.BUILD_TYPE.contains("debug");
    }

    private static String getLogTagWithMethod() {
        try {
            if (FINAL_CONSTANT_IS_LOCAL) {
                Throwable stack = new Throwable().fillInStackTrace();
                StackTraceElement[] trace = stack.getStackTrace();
                return trace[2].getClassName() + "." + trace[2].getMethodName();
            }
        } catch (Exception ignored) {
        }
        return " ";
    }

    public static void a() {
        if (LOG_LEVEL == 1) {
            logger.log(Level.INFO, getLogTagWithMethod());
        }
    }

    public static void i(String msg) {
        if (LOG_LEVEL == 1) {
            logger.log(Level.INFO, getLogTagWithMethod() + " - " + msg);
        }
    }

    public static void e(String msg) {
        if (LOG_LEVEL == 1) {
            logger.log(Level.SEVERE, getLogTagWithMethod() + " - " + msg);
        }
    }
}