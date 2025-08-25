const setup = (infix) => {
  const item = document.getElementById(infix);
  item.value = localStorage.getItem(infix) || "";
  upCharCount(infix);
  item.addEventListener("input", () => {
    upCharCount(infix);
    localStorage.setItem(infix, item.value);
  });

  document.getElementById(`limpar_${infix}`).addEventListener("click", () => {
    item.value = "";
    console.log(``);
    localStorage.removeItem(infix);
  });

  document.getElementById(`copiar_${infix}`).addEventListener("click", () => {
    navigator.clipboard.writeText(item.value);
    showToast(`Anotação ${infix === 'permanente' ? 'permanente' : 'da sessão'} copiada para a área de transferência!`, 'success');
  });

  document.getElementById(`colar_${infix}`).addEventListener("click", () => {
    navigator.clipboard
      .readText()
      .then((clipText) => (item.value = clipText)).catch(() => showToast(`Nenhuma anotação copiada para a área de transferência!`, 'error'));
  });

  document.getElementById(`exportar_${infix}`).addEventListener("click", () => {
    const blob = new Blob([item.value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `anotacao_${infix}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Anotação ${infix === 'permanente' ? 'permanente' : 'da sessão'} exportada!`, 'success');
  });
};

const upCharCount = (infix) => {
  document.getElementById(`chars_${infix}`).textContent =
    `${document.getElementById(infix).value.length} caracteres`;
};

const showToast = (message, state) => {
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.add(state);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add(state);
  }, 3000);
};

["permanente", "sessao"].forEach(setup);