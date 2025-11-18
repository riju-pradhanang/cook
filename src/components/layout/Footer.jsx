export default function Footer(){
  return (
    <footer className="border-t py-8 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-6xl px-4">© {new Date().getFullYear()} CookBook · Your Virtual Kitchen Assistant</div>
    </footer>
  )
}
