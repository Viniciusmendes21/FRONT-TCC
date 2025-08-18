import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CorrecaoComponent {

  tema: string = '';
  texto: string = '';
  resultado: any = null;
  erro: string | null = null;
  carregando = false;

  constructor(private http: HttpClient) { }

  enviar() {
    this.erro = null;
    this.resultado = null;
    this.carregando = true;

    const body = { tema: this.tema, texto: this.texto };

    this.http.post<any>('https://stunning-space-happiness-579g67wj7gj24g49-5096.app.github.dev/api/Correcao/gemini', body)
      .subscribe({
        next: res => {
          this.resultado = res;
          this.carregando = false;
        },
        error: err => {
          this.carregando = false;

          const status = err.status;
          const statusText = err.statusText || 'Erro desconhecido';
          const message = err.error?.message || err.message || 'Erro ao comunicar com o servidor.';
          const errorContent = JSON.stringify(err.error, null, 2);

          this.erro = `Erro ${status} (${statusText}): ${message}\n\nDetalhes:\n${errorContent}`;
          console.error('Erro completo da API:', err);
        }
      });
  }

}
