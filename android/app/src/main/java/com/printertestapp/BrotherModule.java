package com.printertestapp;

import android.Manifest;
import android.content.pm.PackageManager;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;
import android.bluetooth.BluetoothAdapter;
import androidx.annotation.NonNull;
import android.os.Build;
import androidx.core.app.ActivityCompat;

import com.brother.sdk.lmprinter.Channel;
import com.brother.sdk.lmprinter.OpenChannelError;
import com.brother.sdk.lmprinter.PrinterDriver;
import com.brother.sdk.lmprinter.PrinterDriverGenerateResult;
import com.brother.sdk.lmprinter.PrinterDriverGenerator;
import com.brother.sdk.lmprinter.PrintError;
import com.brother.sdk.lmprinter.setting.QLPrintSettings;
import com.brother.sdk.lmprinter.PrinterModel;
import com.brother.sdk.lmprinter.PrinterSearcher;
import com.brother.sdk.lmprinter.PrinterSearchResult;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.ArrayList;
import java.util.Set;

public class BrotherModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    Context context;
    private static final int REQUEST_BLUETOOTH_PERMISSION = 2147483647;

    BrotherModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        this.context = context.getApplicationContext(); // This is where you get the context
    }


    @NonNull
    @Override
    public String getName() {
        return "MyBrotherModule";
    }

    // Handle permission request result
//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        if (requestCode == REQUEST_BLUETOOTH_PERMISSION) {
//            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                Log.d("", "Permission granted, proceed with Bluetooth operation");
//                // Proceed with Bluetooth operation here if needed
//            } else {
//                Log.d("", "Bluetooth permission denied by user");
//                // Handle Bluetooth permission denial here if needed
//            }
//        }
//    }

    @ReactMethod
    public void showToast() {
        Toast.makeText(reactContext, "Hi from Android!!!", Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void printImage(String IPAddress, final Promise promise){
        // Simulate asynchronous operation
        new Thread(() -> {
            // Simulate asynchronous operation
            Channel channel = Channel.newWifiChannel(IPAddress);
            PrinterDriverGenerateResult result = PrinterDriverGenerator.openChannel(channel);
            if (result.getError().getCode() != OpenChannelError.ErrorCode.NoError) {
                Log.e("", "Error - Open Channel: " + result.getError().getCode());
                promise.resolve("Error - Open Channel: " + result.getError().getCode());
                return;
            }
            File dir = context.getExternalFilesDir(null);
            File file = new File(dir, "testJPG.jpg");
            PrinterDriver printerDriver = result.getDriver();
            QLPrintSettings printSettings = new QLPrintSettings(PrinterModel.QL_820NWB);
            printSettings.setLabelSize(QLPrintSettings.LabelSize.DieCutW62H100);
            printSettings.setAutoCut(true);
            printSettings.setWorkPath(dir.toString());
            PrintError printError = printerDriver.printImage(file.toString(), printSettings);
            if (printError.getCode() != PrintError.ErrorCode.NoError) {
                Log.d("", "Error - Print Image: " + file.toString() + printError.getErrorDescription());
                printerDriver.closeChannel();
                promise.resolve("Error - Print Image: " + file.toString() + printError.getErrorDescription());
            }
            else {
                Log.d("", "Success - Print Image");
                printerDriver.closeChannel();
                promise.resolve("Success - Print Image");
            }
        }).start();
    }

    @ReactMethod
    public void printImageBluetooth(final Promise promise){
        // Simulate asynchronous operation
        new Thread(() -> {
            BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

            // Check if Bluetooth is supported on the device
            if (bluetoothAdapter == null) {
                Log.e("Error", "Bluetooth is not supported on this device");
                promise.reject("Error", "Bluetooth is not supported on this device");
                return;
            }

            // Check if Bluetooth is enabled
            if (!bluetoothAdapter.isEnabled()) {
                Log.e("Error", "Bluetooth is not enabled");
                promise.reject("Error", "Bluetooth is not enabled");
                return;
            }

            // Get the list of bonded (paired) devices
            // Check if permission is granted
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && ActivityCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH) != PackageManager.PERMISSION_GRANTED) {
                // Permission not granted, request it from the user
                ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{Manifest.permission.BLUETOOTH}, REQUEST_BLUETOOTH_PERMISSION);
                // You may also request other Bluetooth-related permissions here if needed
            }
            else{
                Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
                // Check if there are paired devices
                if (pairedDevices.isEmpty()) {
                    promise.reject("Error", "No paired Bluetooth devices found");
                    return;
                }

                // Get the MAC address of the first paired device
                BluetoothDevice firstDevice = pairedDevices.iterator().next();
                String macAddress = firstDevice.getAddress();

                Channel channel = Channel.newBluetoothChannel(macAddress, bluetoothAdapter);
                PrinterDriverGenerateResult result = PrinterDriverGenerator.openChannel(channel);
                if (result.getError().getCode() != OpenChannelError.ErrorCode.NoError) {
                    Log.e("", "Error - Open Channel: " + result.getError().getCode());
                    promise.resolve("Error - Open Channel: " + result.getError().getCode());
                    return;
                }
                File dir = context.getExternalFilesDir(null);
                File file = new File(dir, "testJPG.jpg");
                PrinterDriver printerDriver = result.getDriver();
                QLPrintSettings printSettings = new QLPrintSettings(PrinterModel.QL_820NWB);
                printSettings.setLabelSize(QLPrintSettings.LabelSize.DieCutW62H100);
                printSettings.setAutoCut(true);
                printSettings.setWorkPath(dir.toString());
                PrintError printError = printerDriver.printImage(file.toString(), printSettings);
                if (printError.getCode() != PrintError.ErrorCode.NoError) {
                    Log.d("", "Error - Print Image: "  + file.toString() + printError.getErrorDescription());
                    printerDriver.closeChannel();
                    promise.resolve("Error - Print Image: " + file.toString() + printError.getErrorDescription());
                } else {
                    Log.d("", "Success - Print Image");
                    printerDriver.closeChannel();
                    promise.resolve("Success - Print Image");
                }
            }
        }).start();
    }

    private PrinterSearchResult startBluetoothSearch(Context context) {
        return PrinterSearcher.startBluetoothSearch(context);
    }

}