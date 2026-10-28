import UIKit
import React
import React_RCTAppDelegate

// RCTAppDelegate (RN 0.77) creates its window in application(_:didFinishLaunchingWithOptions:),
// which UIKit's scene life cycle no longer allows. AppDelegate disables that and the
// window is created here instead.
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene,
          let appDelegate = UIApplication.shared.delegate as? AppDelegate,
          let moduleName = appDelegate.moduleName else { return }

    let rootView = appDelegate.rootViewFactory.view(
      withModuleName: moduleName,
      initialProperties: appDelegate.initialProps,
      launchOptions: nil
    )
    let rootViewController = appDelegate.createRootViewController()
    appDelegate.setRootView(rootView, toRootViewController: rootViewController)

    let window = UIWindow(windowScene: windowScene)
    window.rootViewController = rootViewController
    window.makeKeyAndVisible()
    self.window = window
    appDelegate.window = window
  }
}
