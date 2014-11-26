package com.example.utils;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.content.DialogInterface.OnClickListener;
import android.content.SharedPreferences.Editor;
import android.content.Intent;
public class AlertLocal extends CordovaPlugin{
	private SharedPreferences preference;
	private Editor editor;
	@Override
	public boolean execute(String action, JSONArray data,
			final CallbackContext callbackContext) throws JSONException {
		// TODO Auto-generated method stub
		String callBack = "";
		if(action.equals("alertLocal")){
			new  AlertDialog.Builder(cordova.getActivity())    
            .setTitle(data.getString(0))  
            .setMessage(data.getString(1) )  
            .setPositiveButton("确定" ,  null )  
            .show();  
			callbackContext.success("OK");
			return true;
		}else if(action.equals("confirmLocal")){
							new  AlertDialog.Builder(cordova.getActivity())    
	            .setTitle(data.getString(0) )  
	            .setMessage(data.getString(1) )  
	            .setPositiveButton("取消" , new OnClickListener() {
					@Override
					public void onClick(DialogInterface arg0, int arg1) {
						// TODO Auto-generated method stub
						callbackContext.success("OK");
					}
				}  )
	            .setNegativeButton("确定", new OnClickListener() {
					
					@Override
					public void onClick(DialogInterface arg0, int arg1) {
						// TODO Auto-generated method stub
						callbackContext.success("NO");
					}
				})
	            .show();  
				return true;
		}else if(action.equals("writePreference")){
			this.preference = cordova.getActivity().getSharedPreferences("ReadingUser", cordova.getActivity().MODE_WORLD_WRITEABLE);
			this.editor = preference.edit();
			System.out.println("write "+data.getInt(0));
			editor.putInt("userId", data.getInt(0));
			editor.commit();
			return true;
		}else if(action.equals("readPreference")){
			this.preference = cordova.getActivity().getSharedPreferences("ReadingUser", cordova.getActivity().MODE_WORLD_WRITEABLE);
			int userId = this.preference.getInt("userId", 0);
			System.out.println("read "+userId);
			callbackContext.success(userId);
			return true;
		}
		return false;
	}
}
