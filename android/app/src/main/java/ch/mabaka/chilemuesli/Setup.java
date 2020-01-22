package ch.mabaka.chilemuesli;

import android.content.res.AssetManager;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Setup {

    /**
     * Copy folder with name <code>name</code> from assests to documents folder.
     *
     * @param name Name of the folder to copy.
     */
    public static void copyFolder(String name) {
        // "Name" is the name of your folder!
        AssetManager assetManager = MainApplication.getContext().getAssets();
        String[] files = null;

        String state = Environment.getExternalStorageState();
        Log.i("INFO", "Try to copy resources to data folder!");
        if (Environment.getDataDirectory().exists()) {
            Log.i("INFO", "Data dir exists");
            // The documents folder exists.
            // Checking file on assets subfolder
            try {
                files = assetManager.list(name);
                Log.i("INFO", "Number of files found: " + files.length);
                for (String file: files) {
                    Log.i("INFO", file);
                }
            } catch (IOException e) {
                Log.e("ERROR", "Failed to get asset file list.", e);
            }
            String targetFolder = MainApplication.getContext().getDataDir() +"/files/"+ name + "/";
            Log.i("INFO", "Try to create target folder: " + targetFolder);
            boolean success = true;
            // First: checking if there is already a target folder
            File folder = new File(targetFolder);
            if (!folder.exists()) {
                Log.i("INFO", "Target folder does not exist => create it!");
                for (int i = 0; i < 10; i ++){
                    success = folder.mkdir();
                    Log.i("INFO", "Target folder creation succeded: " + success);
                    if (success){
                        break;
                    } else {
                        try{
                            Thread.sleep(200);
                        } catch (InterruptedException e) {
                            // ignore
                        }
                    }
                }
            } else {
                Log.i("INFO", "Target folder already exists => remove it first!");
                success = deleteDirectory(folder);
                Log.i("INFO", "Target folder delete succeded: " + success);
                if (success) {
                    success = folder.mkdir();
                }
                Log.i("INFO", "Target folder creation succeded: " + success);
            }
            Log.i("INFO", "Target folder creation succeded: " + success);
            // Analyzing all file on assets subfolder
            for(String filename : files) {
                InputStream in = null;
                OutputStream out = null;


                if (success) {
                    // Moving all the files to data dir
                    try {
                        in = assetManager.open(name + "/" +filename);
                        out = new FileOutputStream(targetFolder + filename);
                        Log.i("INFO", "Copy to: " + targetFolder + filename);
                        copyFile(in, out);
                        in.close();
                        in = null;
                        out.flush();
                        out.close();
                        out = null;
                    } catch(IOException e) {
                        Log.e("ERROR", "Failed to copy asset file: " + filename, e);
                    } finally {
                        // Edit 3 (after MMs comment)
                        try {
                            in.close();
                            in = null;
                        } catch (Exception e){}
                        try {
                            out.flush();
                            out.close();
                            out = null;
                        } catch (Exception e){}

                    }
                }
                else {
                    // Do something else on failure
                }
            }
        } else if (Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
            // We can only read the media
        } else {
            // Something else is wrong. It may be one of many other states, but all we need
            // is to know is we can neither read nor write
        }
    }

    // Method used by copyAssets() on purpose to copy a file.
    private static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[4096];
        int read;
        while((read = in.read(buffer)) != -1) {
            out.write(buffer, 0, read);
        }
    }

    private static boolean deleteDirectory(File directoryToBeDeleted) {
        File[] allContents = directoryToBeDeleted.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        return directoryToBeDeleted.delete();
    }
}
