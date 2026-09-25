export type NotificationType = "info" | "success" | "warning";
export interface AppNotification { id:string; title:string; message:string; type:NotificationType; createdAt:string; read:boolean; }
export function makeNotification(title:string,message:string,type:NotificationType="info"):AppNotification { return {id:crypto.randomUUID(),title,message,type,createdAt:new Date().toISOString(),read:false}; }
