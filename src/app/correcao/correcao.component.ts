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
  arquivoPdf: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.arquivoPdf = file;
      this.erro = null;
    } else {
      this.arquivoPdf = null;
      this.erro = 'Por favor, selecione um arquivo PDF válido.';
    }
  }

  enviar() {
    this.erro = null;
    this.resultado = null;
    this.carregando = true;

    // Envio do PDF (e texto opcional) para o endpoint /api/Correcao
    const formData = new FormData();
    formData.append('tema', this.tema);

    if (this.arquivoPdf) {
      formData.append('arquivo', this.arquivoPdf, this.arquivoPdf.name);
    }
    if (this.texto) {
      formData.append('texto', this.texto);
    }

    this.http.post<any>('https://stunning-space-happiness-579g67wj7gj24g49-5096.app.github.dev/api/Correcao', formData)
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

  enviarGemini() {
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