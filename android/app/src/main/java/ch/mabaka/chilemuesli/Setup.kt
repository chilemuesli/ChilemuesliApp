package ch.mabaka.chilemuesli

import android.content.res.AssetManager
import android.os.Environment
import android.util.Log
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStream
import java.io.OutputStream

object Setup {
    /**
     * Copy folder with name `name` from assests to documents folder.
     *
     * @param name Name of the folder to copy.
     */
    fun copyFolder(name: String) {
        // "Name" is the name of your folder!
        val assetManager: AssetManager = ContextProvider.getContext().assets
        var files: Array<String>? = null

        val state = Environment.getExternalStorageState()
        Log.i("INFO", "Try to copy resources to data folder!")
        if (Environment.getDataDirectory().exists()) {
            Log.i("INFO", "Data dir exists")
            // The documents folder exists.
            // Checking file on assets subfolder
            try {
                files = assetManager.list(name)
                Log.i("INFO", "Number of files found: " + files!!.size)
                for (file in files) {
                    Log.i("INFO", file)
                }
            } catch (e: IOException) {
                Log.e("ERROR", "Failed to get asset file list.", e)
            }
            val targetFolder: String =
                ContextProvider.getContext().dataDir.absolutePath + "/files/" + name + "/"
            Log.i("INFO", "Try to create target folder: $targetFolder")
            var success = true
            // First: checking if there is already a target folder
            val folder = File(targetFolder)
            if (!folder.exists()) {
                Log.i("INFO", "Target folder does not exist => create it!")
                success = folder.mkdirs()
            } else {
                Log.i("INFO", "Target folder already exists => remove it first!")
                success = deleteDirectory(folder)
                Log.i("INFO", "Target folder delete succeded: $success")
                if (success) {
                    success = folder.mkdir()
                }
                Log.i("INFO", "Target folder creation succeded: $success")
            }
            Log.i("INFO", "Target folder creation succeded: $success")
            // Analyzing all file on assets subfolder
            for (filename in files!!) {
                val assetPath = "$name/$filename"
                if (success) {
                    if (isDirectory(assetManager, assetPath)) {
                        copyFolder(assetPath)
                    } else {
                        copyFile(assetManager, targetFolder, filename, assetPath)
                    }
                } else {
                    // Do something else on failure
                }
            }
        } else if (Environment.MEDIA_MOUNTED_READ_ONLY == state) {
            // We can only read the media
        } else {
            // Something else is wrong. It may be one of many other states, but all we need
            // is to know is we can neither read nor write
        }
    }

    private fun copyFile(
        assetManager: AssetManager,
        targetFolder: String,
        filename: String,
        assetPath: String
    ) {
        // Moving the file to data dir
        var `in`: InputStream? = null
        var out: OutputStream? = null
        try {
            `in` = assetManager.open(assetPath)
            out = FileOutputStream(targetFolder + filename)
            Log.i("INFO", "Copy to: $targetFolder$filename")
            copyFileInToOut(`in`, out)
        } catch (e: IOException) {
            Log.e("ERROR", "Failed to copy asset file: $filename", e)
        } finally {
            // Edit 3 (after MMs comment)
            try {
                `in`!!.close()
                `in` = null
            } catch (e: Exception) {
            }
            try {
                out!!.flush()
                out.close()
                out = null
            } catch (e: Exception) {
            }
        }
    }

    // Method used by copyAssets() on purpose to copy a file.
    @Throws(IOException::class)
    private fun copyFileInToOut(`in`: InputStream, out: OutputStream) {
        val buffer = ByteArray(4096)
        var read: Int
        while ((`in`.read(buffer).also { read = it }) != -1) {
            out.write(buffer, 0, read)
        }
    }

    private fun deleteDirectory(directoryToBeDeleted: File): Boolean {
        val allContents = directoryToBeDeleted.listFiles()
        if (allContents != null) {
            for (file in allContents) {
                deleteDirectory(file)
            }
        }
        return directoryToBeDeleted.delete()
    }

    private fun isDirectory(assetManager: AssetManager, assetPath: String): Boolean {
        try {
            return (assetManager.list(assetPath)!!.isNotEmpty())
        } catch (e: IOException) {
            // ignore
        }
        return false
    }
}
