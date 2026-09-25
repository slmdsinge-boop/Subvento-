export type NotificationSeverity = "info" | "success" | "warning" | "error";
export interface AppNotification {
 id: string;
 title: string;
 message: string;
 severity: NotificationSeverity;
 createdAt: string;
 read: boolean;
}
export function makeNotification(
 title: string,
 message: string,
 severity: NotificationSeverity = "info"
): AppNotification {
 return {
 id: crypto.randomUUID(),
 title,
 message,
 severity,
 createdAt: new Date().toISOString(),
 read: false,
 };
}
