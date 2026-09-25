import { Browser } from "@capacitor/browser";
export async function openExternal(url: string): Promise<void> {
 await Browser.open({ url });
}
