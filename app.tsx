import { useEffect, useRef, useState, type CSSProperties } from "react"

const dreamAudioUrl = import.meta.env.VITE_DREAM_AUDIO_URL as string | undefined
const dreamVideoUrl = import.meta.env.VITE_DREAM_VIDEO_URL as string | undefined

const planetDetails: Record<string, {
  degree: number
  distance: number
  size: number
  color: string
  shadow: string
}> = {
  Sun: {
    degree: 19,
    distance: 58,
    size: 50,
    color: "#ffc72c",
    shadow: "#ff6b1a",
  },
  Moon: {
    degree: 18,
    distance: 68,
    size: 9,
    color: "#d8e2ec",
    shadow: "#78889a",
  },
  Mercury: {
    degree: 8,
    distance: 65,
    size: 10,
    color: "#a9a49b",
    shadow: "#555c65",
  },
  Venus: {
    degree: 9,
    distance: 60,
    size: 15,
    color: "#e8c780",
    shadow: "#a96f45",
  },
  Mars: {
    degree: 23,
    distance: 71,
    size: 12,
    color: "#d45b3e",
    shadow: "#74271f",
  },
  Jupiter: {
    degree: 13,
    distance: 61,
    size: 31,
    color: "#d7a66f",
    shadow: "#8f5d46",
  },
  Saturn: {
    degree: 17,
    distance: 67,
    size: 28,
    color: "#d8c58d",
    shadow: "#85704e",
  },
  Uranus: {
    degree: 8,
    distance: 58,
    size: 19,
    color: "#91e4e8",
    shadow: "#3a899e",
  },
  Neptune: {
    degree: 5,
    distance: 56,
    size: 18,
    color: "#477bdf",
    shadow: "#17358a",
  },
  Pluto: {
    degree: 20,
    distance: 68,
    size: 7,
    color: "#c0a07f",
    shadow: "#655044",
  },
}

const planetPortals: Record<string, {
  glyph: string
  label: string
  title: string
  description: string
}> = {
  Sun: {
    glyph: "☉",
    label: "DAYLIGHT / CREATIVE SOURCE",
    title: "Solar Identity",
    description:
      "The illuminated half of the chart: creative purpose, visible work, vitality, and the signal Jade sends into the world.",
  },
  Moon: {
    glyph: "☾",
    label: "TOUR / LIVE DATES",
    title: "Moon Cycle Tour",
    description:
      "Follow the live cycle from city to city, find the next performance, and purchase official tickets.",
  },
  Mercury: {
    glyph: "☿",
    label: "MESSAGES / CONTACT",
    title: "Mercury Hotline",
    description:
      "Transmission center for bookings, collaborations, press, and messages from across the orbit.",
  },
  Venus: {
    glyph: "♀",
    label: "STORE / BEAUTY / BRAND LAB",
    title: "The Venus Counter",
    description:
      "Music objects, beauty experiments, and original campaigns made for the fashion, technology, skincare, and makeup worlds.",
  },
  Mars: {
    glyph: "♂",
    label: "COMPLETE ARTIST ARCHIVE",
    title: "Mars Works",
    description:
      "The full creative output: art, poems, music, music videos, vlogs, behind-the-scenes work, and written dispatches.",
  },
  Jupiter: {
    glyph: "♃",
    label: "REACH / LIVE METRICS",
    title: "The Jupiter Meter",
    description:
      "A growing view of this universe’s reach, from website visits to connected community signals.",
  },
  Saturn: {
    glyph: "♄",
    label: "HEALTH / DISCIPLINE",
    title: "Saturn Training Log",
    description:
      "Gym progress, practical wellness notes, recipes, recovery rituals, and short form tutorials.",
  },
  Uranus: {
    glyph: "♅",
    label: "COMMUNITY SIGNAL BOARD",
    title: "Uranus Stickyverse",
    description:
      "A digital wall for unexpected ideas. Leave a note for Jade and the community.",
  },
  Neptune: {
    glyph: "♆",
    label: "PHOTOGRAPHY",
    title: "Neptune Photo Lab",
    description:
      "Dream-state photography, liquid light, portraits, travel fragments, and visual atmosphere.",
  },
  Pluto: {
    glyph: "♇",
    label: "IXI-GUIDED DIRECTORY",
    title: "The Pluto Archive",
    description:
      "A deep hyperlink index of Spotify playlists, references, tools, and Ready Player One–style artifacts, sorted by IXI.",
  },
}

const neptunePhotos = [
  {
    src: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?auto=format&fit=crop&w=1000&q=82",
    alt: "Calm ocean reflecting golden light",
    credit: "Linus Nylund",
  },
  {
    src: "https://images.unsplash.com/photo-1497290756760-23ac55edf36f?auto=format&fit=crop&w=1000&q=82",
    alt: "Soft cloud floating above the ocean",
    credit: "Pawel Nolbert",
  },
  {
    src: "https://images.unsplash.com/photo-1598941288672-af25bcc7b223?auto=format&fit=crop&w=1000&q=82",
    alt: "Ocean waves breaking into pale foam",
    credit: "Laura Barry",
  },
]

const media = [
  {
    title: "Soft Focus",
    type: "SONG 01",
    note: "A slow song for windows-down evenings.",
    video: "https://www.youtube.com/embed/jfKfPfyJRdk",
  },
  {
    title: "Orange Hours",
    type: "SONG 02",
    note: "Notes from the warmest part of the day.",
    video: "https://www.youtube.com/embed/5qap5aO4i9A",
  },
  {
    title: "After Image",
    type: "SONG 03",
    note: "A little louder, a little less certain.",
    video: "https://www.youtube.com/embed/DWcJFNfaw9c",
  },
  {
    title: "Night Bloom",
    type: "SONG 04",
    note: "Made at 2:14am, best heard after dark.",
    video: "https://www.youtube.com/embed/rUxyKA_-grg",
  },
  {
    title: "Field Notes",
    type: "VLOG 01",
    note: "Fragments, process, and places in between.",
    video: "https://www.youtube.com/embed/lTRiuFIWV54",
  },
  {
    title: "Beginning Again",
    type: "JOURNAL 01",
    note: "On making things before you feel ready.",
    video: "https://www.youtube.com/embed/MVPTGNGiI-4",
  },
  {
    title: "Blue Room",
    type: "SONG 05",
    note: "A demo from the room where it started.",
    video: "https://www.youtube.com/embed/7NOSDKb0HlU",
  },
]

const constellationArt = [
  {
    path: "M5 25 L17 16 L28 20 L42 9 L56 13",
    stars: [
      [5, 25],
      [17, 16],
      [28, 20],
      [42, 9],
      [56, 13],
    ],
  },
  {
    path: "M5 8 L19 18 L30 27 L42 18 L57 7 M30 27 L31 35",
    stars: [
      [5, 8],
      [19, 18],
      [30, 27],
      [42, 18],
      [57, 7],
      [31, 35],
    ],
  },
  {
    path: "M13 5 L15 31 M45 6 L43 32 M13 5 L45 6 M15 31 L43 32 M14 18 L44 19",
    stars: [
      [13, 5],
      [15, 31],
      [45, 6],
      [43, 32],
      [14, 18],
      [44, 19],
    ],
  },
  {
    path: "M8 7 L26 17 L44 11 M26 17 L31 32 M44 11 L56 22",
    stars: [
      [8, 7],
      [26, 17],
      [44, 11],
      [31, 32],
      [56, 22],
    ],
  },
  {
    path: "M7 10 L18 6 L24 14 L18 22 L27 27 L43 24 L56 31",
    stars: [
      [7, 10],
      [18, 6],
      [24, 14],
      [18, 22],
      [27, 27],
      [43, 24],
      [56, 31],
    ],
  },
  {
    path: "M5 27 L17 18 L29 22 L40 12 L56 9 M29 22 L36 33 M40 12 L48 24",
    stars: [
      [5, 27],
      [17, 18],
      [29, 22],
      [40, 12],
      [56, 9],
      [36, 33],
      [48, 24],
    ],
  },
  {
    path: "M8 25 L17 10 L40 8 L53 24 L8 25 M17 10 L14 4 M40 8 L45 3",
    stars: [
      [8, 25],
      [17, 10],
      [40, 8],
      [53, 24],
      [14, 4],
      [45, 3],
    ],
  },
  {
    path: "M5 7 L15 16 L25 13 L34 21 L44 18 L53 25 Q58 30 51 35",
    stars: [
      [5, 7],
      [15, 16],
      [25, 13],
      [34, 21],
      [44, 18],
      [53, 25],
      [51, 35],
    ],
  },
  {
    path: "M7 7 L19 14 L15 29 L29 34 L43 27 L48 11 L58 6 M19 14 L43 27",
    stars: [
      [7, 7],
      [19, 14],
      [15, 29],
      [29, 34],
      [43, 27],
      [48, 11],
      [58, 6],
    ],
  },
  {
    path: "M7 25 L19 17 L31 21 L42 10 L55 17 M31 21 L37 32 M19 17 L14 7",
    stars: [
      [7, 25],
      [19, 17],
      [31, 21],
      [42, 10],
      [55, 17],
      [37, 32],
      [14, 7],
    ],
  },
  {
    path: "M5 11 L18 18 L29 31 L42 22 L56 28 M18 18 L31 8 L42 22",
    stars: [
      [5, 11],
      [18, 18],
      [29, 31],
      [42, 22],
      [56, 28],
      [31, 8],
    ],
  },
  {
    path: "M5 11 L15 18 L25 10 L35 18 L45 9 L57 16 M15 27 L25 34 L35 26 L45 33",
    stars: [
      [5, 11],
      [15, 18],
      [25, 10],
      [35, 18],
      [45, 9],
      [57, 16],
      [15, 27],
      [25, 34],
      [35, 26],
      [45, 33],
    ],
  },
  {
    path: "M5 8 L16 14 L8 22 M16 14 L31 20 L45 17 M45 17 L57 8 M45 17 L57 29",
    stars: [
      [5, 8],
      [16, 14],
      [8, 22],
      [31, 20],
      [45, 17],
      [57, 8],
      [57, 29],
    ],
  },
]

const constellations = [
  { sign: "Aries", key: "D♭", house: 5, bodies: [] },
  { sign: "Taurus", key: "A♭", house: 6, bodies: [] },
  { sign: "Gemini", key: "E♭", house: 7, bodies: [["Saturn", "♄"]] },
  { sign: "Cancer", key: "B♭", house: 8, bodies: [] },
  { sign: "Leo", key: "F", house: 9, bodies: [["Jupiter", "♃"]] },
  { sign: "Virgo", key: "C", house: 10, bodies: [["Sun", "☉"]] },
  { sign: "Libra", key: "G", house: 11, bodies: [["Mercury", "☿"]] },
  { sign: "Scorpio", key: "D", house: 11, bodies: [["Venus", "♀"]] },
  {
    sign: "Ophiuchus",
    key: "A",
    house: 12,
    bodies: [
      ["Neptune", "♆"],
      ["Pluto", "♇"],
    ],
  },
  { sign: "Sagittarius", key: "E", house: 1, bodies: [] },
  { sign: "Capricorn", key: "B", house: 2, bodies: [] },
  {
    sign: "Aquarius",
    key: "F♯",
    house: 3,
    bodies: [
      ["Uranus", "♅"],
      ["Mars", "♂"],
    ],
  },
  { sign: "Pisces", key: "D♭", house: 4, bodies: [["Moon", "☾"]] },
].map((placement, index) => ({
  ...media[index % media.length],
  ...constellationArt[index],
  ...placement,
  angle: -90 + index * (360 / 13),
}))

const houses = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
]

export default function App() {
  const [selected, setSelected] =
    useState<typeof constellations[number] | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [cometActive, setCometActive] = useState(false)
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem("jade-uranus-notes")
    return saved
      ? JSON.parse(saved)
      : ["MAKE SOMETHING STRANGE.", "WE FOUND EACH OTHER HERE."]
  })
  const [visitCount, setVisitCount] = useState(() =>
    Number(localStorage.getItem("jade-visit-count") || 0),
  )
  const [voidPhase, setVoidPhase] =
    useState<"closed" | "falling" | "message" | "waiting" | "playing">("closed")
  const sunClicks = useRef<number[]>([])
  const spinTimer = useRef<number | undefined>(undefined)
  const dreamAudio = useRef<HTMLAudioElement>(null)

  const spin = () => {
    if (spinning) return
    const index = Math.floor(Math.random() * constellations.length)
    const next = 1080 + index * (360 / constellations.length)
    setSpinning(true)
    setRotation((value) => value + next)
    spinTimer.current = window.setTimeout(() => {
      setSpinning(false)
      setSelected(constellations[index])
    }, 1200)
  }

  const enterVoid = () => {
    window.clearTimeout(spinTimer.current)
    setSpinning(false)
    setSelected(null)
    setVoidPhase("falling")
  }

  const handleSunClick = () => {
    const now = Date.now()
    sunClicks.current = [
      ...sunClicks.current.filter((time) => now - time < 700),
      now,
    ]

    if (sunClicks.current.length === 3) {
      sunClicks.current = []
      enterVoid()
      return
    }

    spin()
  }

  const playDream = () => {
    setVoidPhase("playing")
    window.setTimeout(() => void dreamAudio.current?.play(), 0)
  }

  const leaveVoid = () => {
    dreamAudio.current?.pause()
    if (dreamAudio.current) dreamAudio.current.currentTime = 0
    setVoidPhase("closed")
  }

  useEffect(() => {
    if (voidPhase !== "falling" && voidPhase !== "message") return

    const timer = window.setTimeout(
      () => setVoidPhase(voidPhase === "falling" ? "message" : "waiting"),
      voidPhase === "falling" ? 1800 : 4300,
    )

    return () => window.clearTimeout(timer)
  }, [voidPhase])

  useEffect(() => () => window.clearTimeout(spinTimer.current), [])

  useEffect(() => {
    if (sessionStorage.getItem("jade-visit-counted")) return
    const nextCount = visitCount + 1
    sessionStorage.setItem("jade-visit-counted", "true")
    localStorage.setItem("jade-visit-count", String(nextCount))
    setVisitCount(nextCount)
  }, [])

  const addNote = () => {
    const cleanNote = noteText.trim().slice(0, 120)
    if (!cleanNote) return
    const nextNotes = [...notes, cleanNote]
    setNotes(nextNotes)
    setNoteText("")
    localStorage.setItem("jade-uranus-notes", JSON.stringify(nextNotes))
  }

  useEffect(() => {
    let showTimer: number
    let hideTimer: number

    const scheduleComet = () => {
      const now = new Date()
      const next = new Date(now)
      next.setHours(3, 33, 0, 0)
      if (next <= now) next.setDate(next.getDate() + 1)

      showTimer = window.setTimeout(() => {
        const day = next.toISOString().slice(0, 10)
        if (localStorage.getItem("last-comet") !== day) {
          localStorage.setItem("last-comet", day)
          setCometActive(true)
          hideTimer = window.setTimeout(() => setCometActive(false), 9000)
        }
        scheduleComet()
      }, next.getTime() - now.getTime())
    }

    scheduleComet()
    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <main className="site-shell">
      <div className={`comet ${cometActive ? "comet-active" : ""}`}>
        <span>☄</span>
        <small>MAKE A WISH · 3:33</small>
      </div>
      <nav className="nav">
        <button
          className="wordmark"
          onClick={() => {
            setSelected(null)
            setSelectedPlanet(null)
          }}
        >
          JADE SLAY <span aria-label="Hikari, light">光</span>
        </button>
        <p className="nav-center">ROCK-SCHOOL · ALCHEMY · SONICS</p>
        <button
          className="about-link"
          onClick={() => {
            setSelected(null)
            setSelectedPlanet(null)
          }}
        >
          CELESTIAL INDEX / 13
        </button>
      </nav>

      <section
        className={`home ${selected || selectedPlanet ? "is-hidden" : ""}`}
      >
        <div className="intro">
          <p className="eyebrow">LP: J3W3L3Z · LIVE: J4M$</p>
          <h1>Follow the light.</h1>
          <p className="lede">
            A celestial mixtape for the rebels, the dreamers, the it girls.
          </p>
        </div>

        <div className="wheel-wrap">
          <div className="pointer">LAND HERE</div>
          <div className={`wheel ${spinning ? "is-spinning" : ""}`}>
            <div
              className="house-ring"
              aria-label="Twelve fixed astrological houses"
            >
              {houses.map((house, index) => (
                <span
                  className="house-marker"
                  key={house}
                  style={
                    {
                      "--house-angle": `${180 + index * 30}deg`,
                      "--house-upright": `${-(180 + index * 30)}deg`,
                    } as CSSProperties
                  }
                >
                  <b>{house}</b>
                </span>
              ))}
            </div>

            <div
              className="celestial-layer"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {constellations.map((track) => (
                <div
                  aria-label={`Open ${track.sign} in ${track.key}: ${track.title}`}
                  className="ray"
                  key={track.sign}
                  onClick={() => !spinning && setSelected(track)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      if (!spinning) setSelected(track)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  style={
                    { "--ray-angle": `${track.angle}deg` } as CSSProperties
                  }
                >
                  <svg
                    className="ray-line"
                    viewBox="0 0 300 30"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="ray-wave ray-wave-glow"
                      d="M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15"
                    >
                      <animate
                        attributeName="d"
                        dur="1.8s"
                        repeatCount="indefinite"
                        values="M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15;M0 15 L32 21 L52 8 L79 20 L101 6 L129 22 L151 9 L181 21 L207 5 L235 19 L258 8 L289 15;M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15"
                      />
                    </path>
                    <path
                      className="ray-wave ray-wave-core"
                      d="M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15"
                    >
                      <animate
                        attributeName="d"
                        dur="1.8s"
                        repeatCount="indefinite"
                        values="M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15;M0 15 L32 21 L52 8 L79 20 L101 6 L129 22 L151 9 L181 21 L207 5 L235 19 L258 8 L289 15;M0 15 L35 7 L48 20 L82 10 L96 23 L132 5 L148 17 L186 8 L202 22 L238 6 L252 18 L289 15"
                      />
                    </path>
                  </svg>
                  <span className="ray-label">
                    <svg
                      className="constellation-mark"
                      viewBox="0 0 62 38"
                      aria-hidden="true"
                    >
                      <path d={track.path} />
                      {track.stars.map(([cx, cy], starIndex) => (
                        <circle
                          cx={cx}
                          cy={cy}
                          key={starIndex}
                          r={starIndex % 3 === 0 ? 2 : 1.35}
                        />
                      ))}
                    </svg>
                    <span>
                      <b>
                        {track.sign} · {track.key}
                      </b>
                      <em>{track.title}</em>
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="planet-layer">
              {constellations.map((track) =>
                track.bodies.map(([name, glyph]) => {
                  const details = planetDetails[name]
                  const degreeOffset = ((details.degree - 15) / 30) * (360 / 13)

                  return (
                    <span
                      className="planet-bearing"
                      key={name}
                      style={
                        { "--ray-angle": `${track.angle}deg` } as CSSProperties
                      }
                    >
                      <button
                        className={`body body-${name.toLowerCase()}`}
                        title={`${name} · approximately ${details.degree}° ${track.sign} · House ${track.house}`}
                        aria-label={`Open ${name}: ${planetPortals[name].label}`}
                        onClick={() => setSelectedPlanet(name)}
                        style={
                          {
                            "--body-distance": `${details.distance}%`,
                            "--body-offset": `${degreeOffset}deg`,
                            "--body-upright": `${-(track.angle + degreeOffset)}deg`,
                            "--body-size": `${details.size}px`,
                            "--planet-color": details.color,
                            "--planet-shadow": details.shadow,
                          } as CSSProperties
                        }
                        type="button"
                      >
                        <span className="body-marker">
                          <span className="body-orb" />
                          <span className="body-glyph">{glyph}</span>
                          <small>
                            {name} · {details.degree}°
                          </small>
                        </span>
                      </button>
                    </span>
                  )
                }),
              )}
            </div>
            <button
              className="sun"
              onClick={handleSunClick}
              aria-label="Spin the Earth"
            >
              <span className="earth-globe" aria-hidden="true">
                <i className="earth-land earth-land-one" />
                <i className="earth-land earth-land-two" />
                <i className="earth-land earth-land-three" />
              </span>
              <span className="spin-copy">
                {spinning ? "SPINNING" : "SPIN EARTH"}
              </span>
            </button>
          </div>
        </div>

        <div className="home-footer">
          <p>CLICK A RAY TO CHOOSE</p>
          <p>OR CLICK THE EARTH TO SPIN</p>
          <p>D♭ ARIES ↔ G LIBRA · CIRCLE OF FIFTHS</p>
        </div>
      </section>

      <section className={`player-page ${selected ? "is-visible" : ""}`}>
        {selected && (
          <>
            <button className="back" onClick={() => setSelected(null)}>
              ← BACK TO EARTH
            </button>
            <div className="player-copy">
              <p className="eyebrow">
                {selected.sign} · KEY OF {selected.key} · {selected.type}
              </p>
              <h2>{selected.title}</h2>
              <p>{selected.note}</p>
            </div>
            <div className="video-frame">
              <iframe
                src={selected.video}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="player-number">
              {String(constellations.indexOf(selected) + 1).padStart(2, "0")} /
              13
            </p>
          </>
        )}
      </section>

      <section
        className={`planet-portal ${
          selectedPlanet
            ? `is-visible planet-${selectedPlanet.toLowerCase()}`
            : ""
        }`}
      >
        {selectedPlanet && (
          <>
            <button
              className="portal-back"
              onClick={() => setSelectedPlanet(null)}
            >
              ← RETURN TO THE CHART
            </button>
            <header className="portal-header">
              <span className="portal-glyph">
                {planetPortals[selectedPlanet].glyph}
              </span>
              <div>
                <p className="eyebrow">{planetPortals[selectedPlanet].label}</p>
                <h2>{planetPortals[selectedPlanet].title}</h2>
                <p>{planetPortals[selectedPlanet].description}</p>
              </div>
            </header>

            <div className="portal-content">
              {selectedPlanet === "Neptune" && (
                <div className="photo-grid">
                  {neptunePhotos.map((photo) => (
                    <figure key={photo.src}>
                      <img src={photo.src} alt={photo.alt} />
                      <figcaption>
                        PHOTO STUDY · {photo.credit} / UNSPLASH
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {selectedPlanet === "Uranus" && (
                <div className="sticky-board">
                  <div className="sticky-form">
                    <label htmlFor="community-note">
                      TRANSMIT A NOTE · 120 CHARACTERS
                    </label>
                    <textarea
                      id="community-note"
                      maxLength={120}
                      value={noteText}
                      onChange={(event) => setNoteText(event.target.value)}
                      placeholder="Leave an idea in orbit..."
                    />
                    <button onClick={addNote}>PIN TO URANUS</button>
                  </div>
                  <div className="sticky-notes">
                    {notes.map((note, index) => (
                      <article
                        key={`${note}-${index}`}
                        className={`sticky sticky-${index % 3}`}
                      >
                        <span>
                          COMMUNITY SIGNAL {String(index + 1).padStart(2, "0")}
                        </span>
                        <p>{note}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlanet === "Mars" && (
                <div className="archive-grid">
                  {[
                    "ART",
                    "POEMS",
                    "MUSIC",
                    "MUSIC VIDEOS",
                    "VLOGS",
                    "BTS",
                    "BLOGS",
                  ].map((item, index) => (
                    <button key={item}>
                      <span>0{index + 1}</span>
                      {item}
                      <small>ENTER ARCHIVE →</small>
                    </button>
                  ))}
                </div>
              )}

              {selectedPlanet === "Venus" && (
                <div className="venus-layout">
                  <article className="product-card">
                    <div className="cd-art">
                      J3
                      <br />
                      W3
                      <br />
                      L3Z
                    </div>
                    <div>
                      <p className="eyebrow">PHYSICAL CD · FREE SHIPPING</p>
                      <h3>J3W3L3Z</h3>
                      <strong>$9.99</strong>
                      <button>RESERVE A COPY</button>
                    </div>
                  </article>
                  <article className="brand-lab">
                    <p className="eyebrow">ORIGINAL ADVERTISING ONLY</p>
                    <h3>Brand Alignment Lab</h3>
                    <p>
                      Self-directed concepts pitched exclusively to fashion,
                      technology, skincare, and makeup partners that belong in
                      the Jade Slay universe.
                    </p>
                    <button>VIEW SPEC CAMPAIGNS</button>
                  </article>
                </div>
              )}

              {selectedPlanet === "Pluto" && (
                <div className="pluto-directory">
                  <div className="ixi-orb">
                    IXI<span>AI GUIDE · ONLINE</span>
                  </div>
                  {[
                    "SPOTIFY PLAYLISTS",
                    "READY PLAYER ONE SHELF",
                    "VISUAL REFERENCES",
                    "TOOLS + TECHNOLOGY",
                    "CULTURAL FOOTNOTES",
                  ].map((item, index) => (
                    <button key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                      <small>LINK SLOT →</small>
                    </button>
                  ))}
                </div>
              )}

              {selectedPlanet === "Jupiter" && (
                <div className="metric-grid">
                  <article className="visit-meter">
                    <span>THIS BROWSER’S ORBIT</span>
                    <strong>{String(visitCount).padStart(6, "0")}</strong>
                    <small>LOCAL VISITS RECORDED</small>
                  </article>
                  {["INSTAGRAM", "TIKTOK", "YOUTUBE", "SPOTIFY"].map(
                    (platform) => (
                      <article className="metric-card" key={platform}>
                        <span>{platform}</span>
                        <strong>— — —</strong>
                        <small>AWAITING API CONNECTION</small>
                      </article>
                    ),
                  )}
                </div>
              )}

              {selectedPlanet === "Saturn" && (
                <div className="saturn-grid">
                  {[
                    [
                      "TRAINING LOG",
                      "Progressive strength, consistency, and honest check-ins.",
                    ],
                    [
                      "RECIPES",
                      "High-energy meals and small rituals for recovery.",
                    ],
                    [
                      "SHORT TUTORIALS",
                      "Focused movement notes without the noise.",
                    ],
                    ["RECOVERY", "Rest, mobility, sleep, and rebuilding."],
                  ].map(([title, copy], index) => (
                    <article key={title}>
                      <span>WEEK {String(index + 1).padStart(2, "0")}</span>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                      <button>OPEN LOG →</button>
                    </article>
                  ))}
                </div>
              )}

              {selectedPlanet === "Moon" && (
                <div className="tour-board">
                  <div className="tour-board-head">
                    <span>DATE</span>
                    <span>LOCATION</span>
                    <span>VENUE</span>
                    <span>TICKETS</span>
                  </div>
                  <article className="tour-empty">
                    <span className="moon-phase">☾</span>
                    <div>
                      <p className="eyebrow">THE NEXT CYCLE IS FORMING</p>
                      <h3>New tour dates announcing soon.</h3>
                      <p>
                        Official dates, venues, and verified ticket links will
                        appear here first.
                      </p>
                    </div>
                    <button disabled>AWAITING DATES</button>
                  </article>
                  <p className="tour-note">
                    ONLY PURCHASE THROUGH THE VERIFIED LINKS LISTED ON THIS
                    PAGE.
                  </p>
                </div>
              )}

              {["Sun", "Mercury"].includes(selectedPlanet) && (
                <div className="simple-portal">
                  <span>{planetPortals[selectedPlanet].glyph}</span>
                  <p>{planetPortals[selectedPlanet].description}</p>
                  <button>OPEN TRANSMISSION →</button>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      <section
        className={`dream-void void-${voidPhase}`}
        aria-hidden={voidPhase === "closed"}
        aria-label="Dream, a hidden transmission"
      >
        <div className="black-hole-entry" aria-hidden="true">
          <span />
        </div>
        <div className="void-stars" aria-hidden="true">
          <i className="star-cloud star-cloud-one" />
          <i className="star-cloud star-cloud-two" />
        </div>
        <div className="void-storm" aria-hidden="true">
          <i className="storm-bolt storm-bolt-one" />
          <i className="storm-bolt storm-bolt-two" />
          <i className="storm-bolt storm-bolt-three" />
          <i className="storm-flash" />
        </div>

        <p className="void-question" aria-live="polite">
          where am i?...
        </p>

        <button
          className="dream-rocket"
          onClick={playDream}
          aria-label="Catch the rocket and open Dream featuring Salvia Palth"
        >
          <svg viewBox="0 0 120 58" aria-hidden="true">
            <path className="rocket-flame" d="M18 29 1 19l7 10-7 10z" />
            <path
              className="rocket-body"
              d="M16 29C36 4 75 1 111 18l8 11-8 11C75 57 36 54 16 29Z"
            />
            <circle className="rocket-window" cx="76" cy="29" r="9" />
            <path
              className="rocket-fin"
              d="m45 45-20 12 8-19M45 13 25 1l8 19"
            />
          </svg>
          <small>CATCH THE DREAM ROCKET</small>
        </button>

        <div className="dream-transmission">
          <p className="eyebrow">OG TRANSMISSION · FOUND IN DEEP SPACE</p>
          <p className="dream-title">DREAM</p>
          <p className="dream-feature">JADE SLAY · FEATURING SALVIA PALTH</p>
          <p className="dream-status">
            {dreamVideoUrl || dreamAudioUrl
              ? "TRANSMISSION OPEN"
              : "SONG + MUSIC VIDEO AWAITING CONNECTION"}
          </p>
          {dreamVideoUrl && (
            <div className="dream-video">
              <iframe
                src={`${dreamVideoUrl}${
                  dreamVideoUrl.includes("?") ? "&" : "?"
                }autoplay=1`}
                title="Dream by Jade Slay featuring Salvia Palth"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {dreamAudioUrl && (
            <audio ref={dreamAudio} src={dreamAudioUrl} controls />
          )}
        </div>

        <button className="leave-void" onClick={leaveVoid}>
          RETURN TO EARTH
        </button>
      </section>
    </main>
  )
}
