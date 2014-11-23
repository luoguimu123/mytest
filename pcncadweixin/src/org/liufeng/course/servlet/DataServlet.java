package org.liufeng.course.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.sun.crypto.provider.RSACipher;

/**
 * Servlet implementation class DetailServlet
 */
@WebServlet("/dataServlet")
public class DataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		response.setContentType("text/json");
		response.setHeader("Access-Control-Allow-Origin", "*");
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String url = "jdbc:mysql://127.0.0.1:3306/cadweixin?characterEncoding=UTF-8";
		String user = "root";
		String pass = "";
		URLDecoder decoder = new URLDecoder();
//		String name = decoder.decode(request.getParameter("name"));
		String name = request.getParameter("name");
		String sex = request.getParameter("sex");
		String edutime = request.getParameter("edutime");
		String teacher = request.getParameter("teacher");
//		String sex = decoder.decode(request.getParameter("sex"));
//		String edutime = decoder.decode(request.getParameter("edutime"));
//		String teacher = decoder.decode(request.getParameter("teacher"));
		System.out.println("name: "+ name);
		System.out.println("sex: "+sex);
		System.out.println("edutime: "+edutime);
		System.out.println("teacher: "+teacher);
		
		List<Object> list = new ArrayList<Object>();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			java.sql.Connection connection = DriverManager.getConnection(url,user,pass);
			
			
				String sql = "select name, edutime  from  person where ";
				if (name != null && !name.equals("")) {
					sql = sql+"name = '"+name+"' and ";
					
				}
				if (sex != null && !sex.equals("")) {
					sql = sql+"sex="+sex+" and ";
					
				}
				if (edutime != null && !edutime.equals("")) {
					sql = sql+"edutime="+edutime+" and ";
					
				}
				if (teacher != null && !teacher.equals("")) {
					sql = sql+"edutime="+edutime+" and ";
					
				}
				sql= sql.substring(0, sql.length()-4);
				sql = sql+";";
				System.out.println(sql);

				Statement  statement = connection.createStatement();
				ResultSet set = statement.executeQuery(sql);
				while(set.next()){
					Map<String, String> m  = new HashMap<String, String>();
					m.put("name", set.getString("name"));
					m.put("edutime", set.getString("edutime"));
					JSONObject jsonObject = JSONObject.fromObject(m);
					list.add(jsonObject);
				}
				JSONArray array = JSONArray.fromObject(list);
				System.out.println(array.toString());
				PrintWriter pw = response.getWriter();
				pw.print(array.toString());
				pw.close();
				pw=null;
				set.close();
				statement.close();	
			connection.close();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
