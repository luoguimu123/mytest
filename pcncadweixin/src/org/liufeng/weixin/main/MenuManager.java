package org.liufeng.weixin.main;

import org.liufeng.course.menu.Button;
import org.liufeng.course.menu.ClickButton;
import org.liufeng.course.menu.ComplexButton;
import org.liufeng.course.menu.Menu;
import org.liufeng.course.menu.ViewButton;
import org.liufeng.course.pojo.Token;
import org.liufeng.course.util.CommonUtil;
import org.liufeng.course.util.MenuUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 菜单管理器类
 * 
 * @author lidongkui
 * @date 2014-11-11
 */
public class MenuManager {
	private static Logger log = LoggerFactory.getLogger(MenuManager.class);

	/**
	 * 定义菜单结构
	 * 
	 * @return
	 */
	private static Menu getMenu() {
		ViewButton btn11 = new ViewButton();
		btn11.setName("中心概况");
		btn11.setType("view");
		btn11.setUrl("http://www.baidu.com");
		
		ViewButton btn12 = new ViewButton();
		btn12.setName("师资一览");
		btn12.setType("view");
		btn12.setUrl("http://www.baidu.com");
		
		ComplexButton mainBtn1 = new ComplexButton();
		mainBtn1.setName("中心简介");
		mainBtn1.setSub_button(new Button[]{btn11, btn12});
		
		ViewButton mainBtn2 = new ViewButton();
		mainBtn2.setName("校友查询");
		mainBtn2.setType("view");
		mainBtn2.setUrl("http://www.baidu.com");
		
		ClickButton mainBtn3 = new ClickButton();
		mainBtn3.setName("近期通知");
		mainBtn3.setType("click");
		mainBtn3.setKey("buttona");
		
		Menu menu = new Menu();
		menu.setButton(new Button[]{mainBtn1, mainBtn2, mainBtn3});
		
		return menu;
	}

	public static void main(String[] args) {
		// 第三方用户唯一凭证
		String appId = "wx1964c9d08c14c163";
		// 第三方用户唯一凭证密钥
		String appSecret = "ee50fe3c7f04568b7fbb6b4e899fc441";

		// 调用接口获取凭证
		Token token = CommonUtil.getToken(appId, appSecret);
		
		MenuUtil.deleteMenu(token.getAccessToken());
		if (null != token) {
			// 创建菜单
			boolean result = MenuUtil.createMenu(getMenu(), token.getAccessToken());

			// 判断菜单创建结果
			if (result)
				log.info("菜单创建成功！");
			else
				log.info("菜单创建失败！");
		}
	}
}
