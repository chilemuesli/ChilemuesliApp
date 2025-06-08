package ch.mabaka.chilemuesli

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.soloader.OpenSourceMergedSoMapping

class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
        
        override fun getPackages(): List<ReactPackage> {
            return PackageList(this).packages
        }
    }

    override fun onCreate() {
        super.onCreate()
        //SoLoader.init(this, false)
        SoLoader.init(this, OpenSourceMergedSoMapping)
    }
}
