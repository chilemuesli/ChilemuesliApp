#include <jni.h>

extern "C" {
    JNIEXPORT jint JNICALL
    Java_com_chilemuesliapp_MainApplication_dummyMethod(JNIEnv *env, jobject instance) {
        return 0;
    }
}