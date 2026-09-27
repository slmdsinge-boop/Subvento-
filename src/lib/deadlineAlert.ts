export type DeadlineStatus="normal"|"soon"|"urgent"|"today"|"overdue";

export interface DeadlineAlert {
 status:DeadlineStatus;
 daysLeft:number;
 label:string;
}

export function getDeadlineAlert(deadline:string|Date,now:Date=new Date()):DeadlineAlert|null {
 const target=deadline instanceof Date?deadline:new Date(deadline);
 if(Number.isNaN(target.getTime())||Number.isNaN(now.getTime()))return null;
 const sameCalendarDay=target.getFullYear()===now.getFullYear()&&target.getMonth()===now.getMonth()&&target.getDate()===now.getDate();
 if(sameCalendarDay)return {status:"today",daysLeft:0,label:"Échéance aujourd’hui"};
 const daysLeft=Math.ceil((target.getTime()-now.getTime())/86400000);
 if(daysLeft<0)return {status:"overdue",daysLeft,label:"Échéance dépassée"};
 if(daysLeft<=7)return {status:"urgent",daysLeft,label:`${daysLeft} jour${daysLeft>1?"s":""} restant${daysLeft>1?"s":""}`};
 if(daysLeft<=30)return {status:"soon",daysLeft,label:`${daysLeft} jours restants`};
 return {status:"normal",daysLeft,label:`${daysLeft} jours restants`};
}

/** A verified expired deadline prevents presenting a new application as ready to submit. */
export function allowsDeadlineValidation(alert:DeadlineAlert|null|undefined):boolean {
 return alert?.status!=="overdue";
}
