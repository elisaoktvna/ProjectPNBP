class GestureHandle {
  constructor() {
    this.state = {
      layer: 0,
      element: 0,
    };
    this.indexActive = 0;
    this.modalIndex = 0;
    this.isClickEnabled = true; // Flag to enable/disable clicking
    this.kategoriContainer = document.querySelector(".kategori-parent");
    this.produkContainer = document.querySelector(".produk-parent");
    this.cartContainer = document.querySelector(".cart-parent");
  }

  setGesture = (gesture) => {
    this.gesture = gesture;
  };

  init = () => {
    this.kategoriItem = [...document.querySelectorAll(".kategori-item")];
    this.produkItem = [...document.querySelectorAll(".produk-item")];
    this.cartItem = [...document.querySelectorAll(".cart-item")];

    if (
      this.state.layer === 1 &&
      this.gesture.gesture === "Open" &&
      this.state.element != 4
    ) {
      this.resetState();
    } else if (this.state.layer === 0) {
      this.handleMainCategories();
    } else if (this.state.layer === 1) {
      this.handleElementNavigation();
    }
  };

  handleMainCategories = () => {
    const categoryActions = {
      One: this.kategoriHandle,
      Two: this.produkHandle,
      Three: this.cartHandle,
    };
    categoryActions[this.gesture.gesture]?.();
  };

  handleElementNavigation = () => {
    console.log(this.gesture, this.state);

    const elementActions = {
      1: () => this.navigateItems(this.kategoriItem),
      2: () => this.navigateItems(this.produkItem),
      3: () => this.navigateItems(this.cartItem),
      4: () => this.navigateItems(this.cartItem),
    };

    elementActions[this.state.element]?.();
  };

  navigateItems = (itemsArray) => {
    const { gesture, handType } = this.gesture;
  
    // Jeda waktu antar perubahan fokus (misalnya 1000ms = 1 detik)
    const delay = 500;
  
    // Cek apakah fokus sedang dalam proses dan belum boleh diganti
    if (this.isFocusing) return;
  
    if (gesture === "One") {
      // Aktifkan flag fokus untuk mencegah perubahan fokus selama delay
      this.isFocusing = true;
  
      setTimeout(() => {
        this.indexActive =
          handType === "Right"
            ? Math.min(this.indexActive + 1, itemsArray.length - 1)
            : Math.max(this.indexActive - 1, 0);
        
        this.focusItem(itemsArray);
  
        // Setelah jeda selesai, izinkan perubahan fokus lagi
        this.isFocusing = false;
      }, delay);
    } else if (
      this.state.layer === 1 &&
      this.state.element === 3 &&
      this.gesture.gesture == "Okay"
    ) {
      this.handleCheckout();
    } else if (
      this.state.layer === 1 &&
      this.state.element === 4 &&
      this.gesture.gesture == "Thumb Up"
    ) {
      this.handleModal();
    } else {
      this.focusItem(itemsArray);
    }
  };
  

  handleCheckout = () => {
    const checkoutBtn = document.querySelector(".checkoutBtn");
    const cancelBtn = document.querySelector(".cancelBtn");
    if (this.gesture.handType == "Right" && this.isClickEnabled) {
      checkoutBtn.click();
      this.state = {
        layer: 1,
        element: 4,
      };
      this.isClickEnabled = false;
    }
    if (this.gesture.handType == "Left" && this.isClickEnabled) {
      cancelBtn.click();
      this.isClickEnabled = false;
      this.state = {
        layer: 1,
        element: 3,
      };
      this.resetState();
    }

    setTimeout(() => {
      this.isClickEnabled = true;
    }, 1000);
  };
  handleModal = () => {
    const batalBtn = document.querySelectorAll(".batalModal");
    const okeBtn = document.querySelectorAll(".okeModal");
    const index = this.modalIndex >= 1 ? 1 : 0;
    if (this.gesture.handType == "Right" && this.isClickEnabled) {
      okeBtn[index]?.click();
      this.isClickEnabled = false;
    }
    if (this.gesture.handType == "Left" && this.isClickEnabled) {
      batalBtn[index]?.click();
      this.isClickEnabled = false;
      this.state = {
        layer: 1,
        element: 3,
      };
      this.resetState();
    }
    if (index == 1) {
      this.resetState();
    }
    setTimeout(() => {
      this.modalIndex++;
      this.isClickEnabled = true;
    }, 1000);
  };
  kategoriHandle = () =>
    this.focusContainer(this.kategoriContainer, this.kategoriItem, 1);
  produkHandle = () =>
    this.focusContainer(this.produkContainer, this.produkItem, 2);
  cartHandle = () => this.focusContainer(this.cartContainer, this.cartItem, 3);

  focusContainer = (container, itemsArray, element) => {
    this.clearFocus();
    container?.classList.add("focus-left-container");
    this.indexActive = Math.min(this.indexActive, itemsArray.length - 1);
    this.focusItem(itemsArray);
    this.state = { layer: 1, element };
  };

  focusItem = (itemsArray) => {
    const index = Math.min(this.indexActive, itemsArray.length - 1);

    if (!itemsArray[index])
      return console.warn("Tidak ada item yang ditemukan.");

    if (this.state.element === 3) {
      this.handleCartFocus(itemsArray[index]);
    }

    itemsArray[index].focus();
    if (this.state.element === 1) {
      this.triggerItemClick(itemsArray[index]);
    }
    if (this.gesture.gesture === "Okay" && this.isClickEnabled) {
      this.triggerItemClick(itemsArray[index]);
    }
  };

  handleCartFocus = (item) => {
    this.toggleShadow(item, "shadow-bottom-container");
    const decreaseButton = item.parentElement.querySelector(".decrease");
    const increaseButton = item.parentElement.querySelector(".increase");

    if (this.isClickEnabled && this.gesture.gesture === "Thumb Up") {
      if (this.gesture.handType === "Left" && decreaseButton) {
        this.clickButton(decreaseButton);
      } else if (this.gesture.handType === "Right" && increaseButton) {
        this.clickButton(increaseButton);
      }
    }
  };

  toggleShadow = (item, shadowClass) => {
    document.querySelector(`.${shadowClass}`)?.classList.remove(shadowClass);
    item.classList.add(shadowClass);
  };

  clickButton = (button) => {
    button.focus();
    button.click();
    this.disableClickTemporarily();
  };

  triggerItemClick = (item) => {
    item.click();
    this.disableClickTemporarily();
  };

  disableClickTemporarily = () => {
    // Log to ensure the flag resets correctly
    console.log("Click disabled temporarily");
    this.isClickEnabled = false;
    setTimeout(() => {
      this.isClickEnabled = true;
      console.log("Click re-enabled");
    }, 1000); // Adjust the timeout as necessary
  };

  resetState = () => {
    this.clearFocus();
    this.indexActive = 0;
    this.state = { layer: 0, element: 0 };
    this.modalIndex = 0;
  };

  clearFocus = () => {
    document
      .querySelector(".focus-left-container")
      ?.classList.remove("focus-left-container");
    document
      .querySelector(".focus-bottom-container")
      ?.classList.remove("focus-bottom-container");
    document
      .querySelector(".shadow-bottom-container")
      ?.classList.remove("shadow-bottom-container");

    this.kategoriItem.forEach((item) => item.blur());
    this.produkItem.forEach((item) => item.blur());
    this.cartItem.forEach((item) => item.blur());
  };
}

export default GestureHandle;
