(() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    n = ["A", "J", "Q", "K"];
  let o = 0,
    r = 0,
    c = 0;
  const s = document.querySelector("#btnGet"),
    l = document.querySelector("#btnStop"),
    a = document.querySelector("#btnNew"),
    i = document.querySelector("#cardsPlayer"),
    u = document.querySelector("#cardsComputer"),
    d = document.querySelectorAll(".game-players h2 span"),
    m = document.querySelector(".result"),
    p = document.querySelector(".modal"),
    y = () => {
      e = g();
    },
    g = () => {
      e = [];
      for (let n = 2; n <= 10; n++) for (let o of t) e.push(n + o);
      for (let o of n) for (let n of t) e.push(o + n);
      return _.shuffle(e);
    },
    h = (e) => {
      const t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    T = (t) => {
      const n = (() => {
        if (0 === e.length) throw "No hay cartas en el deck";
        return e.pop();
      })();
      t === d[0]
        ? ((o += h(n)), (t.innerText = o))
        : ((r += h(n)), (t.innerText = r));
      const c = document.createElement("img");
      (c.src = `./assets/images/cartas/${n}.png`),
        c.classList.add("card", "move"),
        setTimeout(() => {
          c.classList.remove("move");
        }, 100),
        t === d[0] ? i.append(c) : u.append(c);
    },
    b = (e) => {
      for (; r < e && e <= 21 && (T(d[1]), !(e > 21)); );
      setTimeout(() => {
        r > 21
          ? (S(
              "You win!",
              "Congratulations, so next time it won't be so easy.."
            ),
            L())
          : r === e
          ? (S("We tie!", "Nobody lost, that's good right?"), L())
          : (S("You lost.", "I hope you have more luck next time."), L());
      }, 700);
    },
    f = (e) => {
      (e.disabled = !0), (e.style.background = "#333");
    },
    v = (e) => {
      (e.disabled = !1), (e.style.background = "#06c");
    },
    L = () => {
      m.classList.toggle("active");
    },
    S = (e, t) => {
      p.innerHTML = "";
      const n = document.createElement("h3"),
        o = document.createElement("p"),
        r = document.createElement("button");
      (n.innerText = e),
        (o.innerText = t),
        (r.innerText = "Close"),
        r.addEventListener("click", () => {
          L();
        }),
        p.prepend(n, o, r);
    },
    x = () => {
      y(),
        (r = 0),
        (o = 0),
        (d[0].innerText = 0),
        (d[1].innerText = 0),
        v(s),
        v(l),
        (u.innerHTML = ""),
        (i.innerHTML = ""),
        (c = 0),
        m.classList.remove("active");
    };
  s.addEventListener("click", () => {
    0 === c && (c++, T(d[1])),
      T(d[0]),
      o > 21 ? (f(s), f(l), b(o)) : 21 === o && (f(s), f(l), b(o));
  }),
    l.addEventListener("click", () => {
      f(s), f(l), b(o);
    }),
    a.addEventListener("click", () => {
      x();
    }),
    y();
})();
