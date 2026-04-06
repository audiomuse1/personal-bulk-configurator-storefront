(function () {
  var PRODUCT_IDS = {
    tshirt: 1061,
    sticker: 1062,
    button: 1063,
    mug: 1064,
    cancooler: 1065,
    yardsign: 1066,
  };

  var tabs = document.getElementById("bulk-product-tabs");
  var configurator = document.getElementById("bulk-configurator");

  if (!tabs || !configurator) return;

  var initialType = configurator.getAttribute("productType") || "tshirt";
  configurator.setAttribute(
    "productId",
    String(PRODUCT_IDS[initialType] || 0),
  );

  tabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".product-tab");
    if (!btn) return;
    var product = btn.dataset.product;
    if (!product) return;

    tabs.querySelectorAll(".product-tab").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    configurator.setAttribute("productType", product);
    configurator.setAttribute(
      "productId",
      String(PRODUCT_IDS[product] || 0),
    );
  });

  configurator.addEventListener("add-to-cart", function (e) {
    var detail = e.detail;
    console.log("Bulk order added:", detail);

    if (detail.productId > 0) {
      setTimeout(function () {
        window.location.href = "/cart.php";
      }, 1500);
    }
  });
})();