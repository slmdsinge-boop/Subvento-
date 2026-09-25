export default function DossierLayout({ children }: { children: React.ReactNode }) {
 return (
  <div className="max-w-3xl w-full mx-auto px-5 py-10 sm:py-14 flex-1">
   {children}
  </div>
 );
}