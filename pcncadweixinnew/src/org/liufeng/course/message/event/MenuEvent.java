package org.liufeng.course.message.event;

public class MenuEvent extends BaseEvent {
	
	private String EventKey;

	public String getEventKey() {
		return EventKey;
	}

	public void setEventKey(String eventKey) {
		EventKey = eventKey;
	}
}
