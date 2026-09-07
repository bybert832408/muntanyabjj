import type { Dictionary } from "@/lib/dictionaries";
import { schedule } from "@/lib/site-config";

export default function Horaris({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {dict.home.horaris.heading}
        </h2>
        <p className="mt-2 text-sm text-white/60">{dict.home.horaris.note}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {schedule.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl border border-white/10 p-6"
            >
              <h3 className="font-semibold text-white">
                {dict.home.horaris.days[day.day]}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {day.sessions.map((session) => (
                  <li
                    key={session.time}
                    className={
                      session.type === "bjjKids"
                        ? "rounded-lg bg-mbjj-blue/15 px-3 py-2 font-semibold text-mbjj-blue"
                        : "text-white/70"
                    }
                  >
                    {session.time} — {dict.home.horaris.sessionTypes[session.type]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
