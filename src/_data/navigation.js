module.exports = [
  {
    key: "dashboard",
    label: "Field Desk",
    href: "/",
    deck: "Current outbreak intelligence and surveillance signals."
  },
  {
    key: "record",
    label: "Epidemic Record",
    href: "/disease-sunburst.html",
    deck: "Two millennia of virulent disease rendered as a radial archive."
  },
  {
    key: "vectors",
    label: "Vector Atlas",
    href: "/vector-atlas.html",
    deck: "Disease carriers, ecological ranges, and corridors of transmission."
  },
  {
    key: "histories",
    label: "Pathogen Chronicles",
    deck: "Single-disease deep dives — origin, timeline, and where each stands today.",
    children: [
      {
        key: "chronicle",
        label: "Hemorrhagic Fevers",
        href: "/pathogen-history.html",
        deck: "Filoviridae events, geography, taxonomy, and outcomes."
      },
      {
        key: "plagues",
        label: "Great Plagues",
        href: "/plague-history.html",
        deck: "The long arc of plague from antiquity to modern surveillance."
      },
      {
        key: "measles",
        label: "Measles",
        href: "/measles.html",
        deck: "The American resurgence, vaccination gaps, and outbreak pattern."
      },
      {
        key: "tuberculosis",
        label: "Tuberculosis",
        href: "/tuberculosis.html",
        deck: "The world consumption created — the deadliest infection, and the disease that made us modern."
      },
      {
        key: "hiv",
        label: "HIV/AIDS",
        href: "/hiv.html",
        deck: "The disease they wouldn't name — from a nameless cluster of cases to U=U."
      },
      {
        key: "smallpox",
        label: "Smallpox",
        href: "/smallpox.html",
        deck: "The only disease we ever eradicated — and the one way it could come back."
      },
      {
        key: "spanish-flu",
        label: "Spanish Flu",
        href: "/spanish-flu.html",
        deck: "1918 — the deadliest pandemic in modern history, and the two cities that proved intervention works."
      },
      {
        key: "cholera",
        label: "Cholera",
        href: "/cholera.html",
        deck: "The disease that invented epidemiology — still on its seventh pandemic, and still curable for pennies."
      }
    ]
  }
];
