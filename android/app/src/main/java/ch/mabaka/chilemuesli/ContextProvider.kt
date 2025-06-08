package ch.mabaka.chilemuesli

import android.app.Application
import android.content.Context

object ContextProvider {
    private lateinit var applicationContext: Context
    
    fun init(application: Application) {
        applicationContext = application.applicationContext
    }
    
    fun getContext(): Context {
        return applicationContext
    }
}