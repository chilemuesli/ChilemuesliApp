package ch.mabaka.chilemuesli

import android.app.Application
import ch.mabaka.chilemuesli.Setup.copyFolder
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class MainApplication : Application(), ReactApplication {
    private val applicationScope = CoroutineScope(Dispatchers.Main + Job())

    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList = PackageList(this).packages,
        )
    }

    override fun onCreate() {
        super.onCreate()
        loadReactNative(this)
        ContextProvider.init(this)
        
        // Starte Coroutine für das Kopieren des Ordners
        applicationScope.launch(Dispatchers.IO) {
            copyFolder("raw")
        }
    }

    override fun onTerminate() {
        super.onTerminate()
        // Cleanup der Coroutines beim Beenden der App
        applicationScope.coroutineContext[Job]?.cancel()
    }
}
