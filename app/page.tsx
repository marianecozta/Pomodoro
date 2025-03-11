"use client";

import { useState, useEffect } from "react";
import "@fontsource/bebas-neue";

interface Tarefa {
  texto: string;
  concluida: boolean;
}

const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play().catch((e) => console.error("Erro ao tocar som:", e));
};

export default function PomodoroApp() {
  const [tempo, setTempo] = useState(25 * 60);
  const [tempoDescanso, setTempoDescanso] = useState(5 * 60);
  const [executando, setExecutando] = useState(false);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modoNoturno, setModoNoturno] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [mostrarConfiguracao, setMostrarConfiguracao] = useState(false);
  const [ciclosConcluidos, setCiclosConcluidos] = useState(0);
  const [tempoEstudado, setTempoEstudado] = useState(0);
  const [atividadesConcluidas, setAtividadesConcluidas] = useState(0);
  const [novoTempo, setNovoTempo] = useState(25);
  const [novoDescanso, setNovoDescanso] = useState(5);

  useEffect(() => {
    let intervalo: NodeJS.Timeout | undefined;
    if (executando && tempo > 0) {
      intervalo = setInterval(() => setTempo((prev) => prev - 1), 1000);
    }
    if (tempo === 0) {
      playSound("/notificacao-fim.mp3");
      alert("Tempo finalizado!");
      setCiclosConcluidos((prev) => prev + 1);
      setTempoEstudado((prev) => prev + 25);
      setTempo(tempoDescanso);
      setExecutando(false);
    }
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [executando, tempo]);

  const iniciarPomodoro = () => {
    playSound("/notificacao-inicio.mp3");
    setExecutando(!executando);
  };

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa("");
    }
  };

  const alternarConclusao = (indice: number) => {
    setTarefas(
      tarefas.map((tarefa, i) => {
        if (i === indice) {
          if (!tarefa.concluida) {
            setAtividadesConcluidas((prev) => prev + 1);
            playSound("/notificacao-check.mp3");
          }
          return { ...tarefa, concluida: !tarefa.concluida };
        }
        return tarefa;
      })
    );
  };

  const resetarPomodoro = () => {
    setExecutando(false);
    setTempo(25 * 60);
  };

  const limparTarefas = () => {
    setTarefas([]);
  };

  const aplicarConfiguracao = () => {
    setTempo(novoTempo * 60);
    setTempoDescanso(novoDescanso * 60);
    setMostrarConfiguracao(false);
  };

  return (
    <div className={`p-4 min-h-screen flex flex-col items-center justify-center ${modoNoturno ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="absolute top-4 right-4 text-right text-sm sm:text-base">
        <p>Ciclos concluídos: {ciclosConcluidos}</p>
        <p>Tempo estudado: {tempoEstudado} min</p>
        <p>Atividades concluídas: {atividadesConcluidas}</p>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        Pomodoro Universitário
      </h1>
      
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#067bb2" strokeWidth="6" fill="none" opacity="0.3" />
          <circle cx="50" cy="50" r="45" stroke="#b4db8c" strokeWidth="6" fill="none" 
            strokeDasharray="283" strokeDashoffset={(tempo / (25 * 60)) * 283} strokeLinecap="round"
          />
        </svg>
        <span className="text-2xl sm:text-3xl font-mono">{Math.floor(tempo / 60)}:{(tempo % 60).toString().padStart(2, "0")}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button onClick={iniciarPomodoro} className="p-2 bg-blue-500 text-white rounded text-sm sm:text-base">
          {executando ? "Pausar" : "Iniciar"}
        </button>
        
        <button onClick={resetarPomodoro} className="p-2 bg-red-500 text-white rounded text-sm sm:text-base">
          Resetar
        </button>

        <button onClick={() => setMostrarConfiguracao(!mostrarConfiguracao)} className="p-2 bg-blue-200 text-white rounded text-sm sm:text-base">
          ⚙️
        </button>
        
        <button onClick={() => setModoNoturno(!modoNoturno)} className="p-2 bg-gray-700 text-white rounded text-sm sm:text-base">
          {modoNoturno ? "🌞" : "🌙"}
        </button>
      </div>

      {mostrarConfiguracao && (
        <div className="mt-4 p-4 border rounded w-full max-w-md bg-white text-black">
          <h2 className="text-lg font-semibold">Configurar Timer</h2>
          <label className="block mt-2">Tempo de Foco (min):</label>
          <input type="number" value={novoTempo} onChange={(e) => setNovoTempo(Number(e.target.value))} className="p-2 border rounded w-full" />
          
          <label className="block mt-2">Tempo de Descanso (min):</label>
          <input type="number" value={novoDescanso} onChange={(e) => setNovoDescanso(Number(e.target.value))} className="p-2 border rounded w-full" />
          
          <button onClick={aplicarConfiguracao} className="mt-2 p-2 bg-green-500 text-white rounded w-full">
            Aplicar
          </button>
        </div>
      )}

      <div className="mt-6 w-full max-w-md px-2">
        <h2 className="text-lg font-semibold mb-2">Lista de Tarefas</h2>
        <input type="text" value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)} className="p-2 border rounded w-full" placeholder="Adicionar nova tarefa" />
        <button onClick={adicionarTarefa} className="p-2 bg-green-400 text-white rounded mt-2 w-full">Adicionar</button>
        
        <button onClick={limparTarefas} className="p-2 bg-red-400 text-white rounded mt-2 w-full">Limpar Tarefas</button>

        <ul className="mt-4">
          {tarefas.map((tarefa, index) => (
            <li key={index} className="flex items-center justify-between p-2 border-b">
              <span className={tarefa.concluida ? "line-through" : ""}>{tarefa.texto}</span>
              <button onClick={() => alternarConclusao(index)} className="ml-2 p-1 bg-blue-500 text-white rounded">✔</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
