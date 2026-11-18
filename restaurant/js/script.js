"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const globalNav = document.querySelector("#global-nav");

if (menuToggle && globalNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "メニューを開く");
    globalNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
    globalNav.classList.toggle("is-open", !isOpen);
  });

  globalNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const reservationForm = document.querySelector("#reservation-form");
const visitDate = document.querySelector("#visit-date");
const formStatus = document.querySelector("#form-status");

if (visitDate instanceof HTMLInputElement) {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  visitDate.min = now.toISOString().slice(0, 16);
}

if (reservationForm instanceof HTMLFormElement && visitDate instanceof HTMLInputElement && formStatus) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    if (!reservationForm.reportValidity()) {
      return;
    }

    const selectedDate = new Date(visitDate.value);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
      visitDate.setCustomValidity("現在より後の日時を選択してください。");
      visitDate.reportValidity();
      visitDate.setCustomValidity("");
      return;
    }

    formStatus.textContent = "入力内容を確認しました。デモフォームのため予約は送信されません。実際のご予約はお電話でお願いいたします。";
  });
}