import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'panaderia';
  cart = [
    { nombre: 'DETALLES DAMA', cantidad: 2 }
  ];
  userName = '';
  phone = '';

  enviarPedido() {
    let mensaje = 'Hola, deseo realizar el siguiente pedido:\n\n';
    this.cart.forEach(item => {
      mensaje += `- ${item.nombre} x${item.cantidad}\n`;
    });
    mensaje += `\nMi nombre: ${this.userName}\nMi número: ${this.phone}`;
    const whatsappURL = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');
  }

  agregarProducto(nombre: string) {
    const existente = this.cart.find(p => p.nombre === nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      this.cart.push({ nombre, cantidad: 1 });
    }
  }

  quitarProducto(nombre: string) {
    const index = this.cart.findIndex(p => p.nombre === nombre);
    if (index !== -1) {
      this.cart[index].cantidad--;
      if (this.cart[index].cantidad <= 0) this.cart.splice(index, 1);
    }
  }
}
