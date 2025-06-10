package ch.mabaka.chilemuesli

import android.app.Application
import ch.mabaka.chilemuesli.Setup.copyFolder
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class MainApplication : Application(), ReactApplication {
    private val applicationScope = CoroutineScope(Dispatchers.Main + Job())

    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
        
        override fun getPackages(): List<ReactPackage> {
            return PackageList(this).packages
        }
        
        override fun getJSMainModuleName(): String = "index"
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, OpenSourceMergedSoMapping)
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
