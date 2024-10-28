import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Cpu, Zap } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Cpu className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-2xl font-bold text-gray-800">Web App Reparaciones</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Servicios
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Proyectos
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Nosotros
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contacto
          </Link>
          <Link className="text-sm font-medium text-orange-500 hover:underline underline-offset-4" href="/login">
            Iniciar Sesión
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sus Equipos, Nuestra Experiencia
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Desde reparaciones hasta proyectos personalizados, damos vida a sus ideas tecnológicas. Únase a nuestra comunidad.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-orange-500 hover:bg-orange-600">Comenzar</Button>
                  <Button variant="outline">Saber Más</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="h-32 w-32 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Servicios</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Wrench className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Reparaciones</h3>
                <p className="text-sm text-gray-500 text-center">Servicios expertos de reparación para todos sus dispositivos electrónicos</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Cpu className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Proyectos Personalizados</h3>
                <p className="text-sm text-gray-500 text-center">Haga realidad sus ideas con nuestros servicios personalizados</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Actualizaciones</h3>
                <p className="text-sm text-gray-500 text-center">Mejore sus dispositivos con nuestros servicios de actualización</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Contáctenos</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Póngase en Contacto</h3>
                  <p className="text-gray-500">¿Tiene un proyecto en mente? Hablemos sobre cómo podemos ayudar.</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Correo</p>
                  <p className="text-sm text-gray-500">info@reparaciones.com</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-sm text-gray-500">Calle Principal 123, Ciudad, CP 12345</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">
                      Nombre
                    </label>
                    <Input id="name" placeholder="Ingrese su nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Correo
                    </label>
                    <Input id="email" placeholder="Ingrese su correo" type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="message">
                    Mensaje
                  </label>
                  <Textarea className="min-h-[100px]" id="message" placeholder="Ingrese su mensaje" />
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full">Enviar Mensaje</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Web App Reparaciones. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}
