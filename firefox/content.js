(function () {
    if (window.location.hostname === "x45k.dev") {
      return; 
    }
  
    function censorText(node) {
      const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
  
      while (walker.nextNode()) {
        let text = walker.currentNode.nodeValue;
        let censoredText = text.replace(/(grass)/gi, (match) => {
          return match[0] === "G" ? "Gr**s" : "gr**s";
        });
  
        if (text !== censoredText) {
          walker.currentNode.nodeValue = censoredText;
        }
      }
    }
  
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              censorText(node.parentNode);
            } else {
              censorText(node);
            }
          });
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    censorText(document.body);
  })();
  