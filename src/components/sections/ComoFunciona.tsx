'use client'

import { useEffect, useState, useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { motion } from 'framer-motion'
import styles from './ComoFunciona.module.css'
import {
    IconStethoscope,
    IconAlertCircle,
    IconUserOff,
    IconRobot,
    IconCalendarCheck,
    IconHeart,
    IconPhoneOff,
    IconClock,
    IconHomeOff,
    IconMessageOff,
    IconToolsKitchen2,
    IconBrandWhatsapp,
    IconArrowsExchange,
    IconSend,
    IconUsers,
    IconBulb,
    IconTrendingUp,
    IconTrendingDown,
  } from '@tabler/icons-react'

const ESCENARIOS = {
    veterinaria: {
      tab: '🐾 Veterinaria',
      antes: {
        wappNombre: 'Fulana',
        wappInicial: 'M',
        mensajeCliente: 'Hola, quisiera sacar turno para mi perro. ¿Tienen para mañana?',
        hora: '14:32',
        pasos: [
          { icon: <IconStethoscope size={17} />, tipo: 'amber', label: 'El equipo está ocupado',         detail: 'El recepcionista está atendiendo a otro cliente en el mostrador.' },
          { icon: <IconAlertCircle size={17} />, tipo: 'red',   label: 'Interrupción o demora',           detail: 'O abandona lo que hace para responder, o el cliente espera demasiado.' },
          { icon: <IconUserOff size={17} />,     tipo: 'red',   label: 'El cliente busca otra opción',    detail: 'Sin respuesta en minutos, llama a la veterinaria de al lado.' },
        ],
        outcome: 'Turno perdido · equipo interrumpido',
      },
      despues: {
        mensajeBot: '¡Hola! Claro, tenemos turnos mañana de 9 a 13hs. ¿Es consulta de rutina o tiene algún síntoma? 🐾',
        hora: '14:32',
        pasos: [
          { icon: <IconRobot size={17} />,          tipo: 'green', label: 'El asistente responde al instante',  detail: 'Mientras el equipo sigue atendiendo, sin interrupciones.' },
          { icon: <IconCalendarCheck size={17} />,  tipo: 'green', label: 'Turno confirmado automáticamente',   detail: 'El cliente elige horario y queda registrado.' },
          { icon: <IconHeart size={17} />,          tipo: 'green', label: 'El equipo sigue enfocado',           detail: 'Mejor atención al cliente presencial y al digital al mismo tiempo.' },
        ],
        outcome: 'Turno ganado · equipo sin interrupciones',
      },
    },
    inmobiliaria: {
      tab: '🏠 Inmobiliaria',
      antes: {
        wappNombre: 'Mengano',
        wappInicial: 'F',
        mensajeCliente: 'Buenas, quería consultar por el depto de 2 ambientes en calle 13. ¿Sigue disponible?',
        hora: '18:55',
        pasos: [
          { icon: <IconPhoneOff size={17} />, tipo: 'amber', label: 'El asesor terminó su jornada',      detail: 'Son las 6pm, el equipo ya no está en la oficina.' },
          { icon: <IconClock size={17} />,    tipo: 'red',   label: 'La consulta queda sin respuesta',   detail: 'El interesado espera hasta el día siguiente.' },
          { icon: <IconHomeOff size={17} />,  tipo: 'red',   label: 'Otro interesado llega primero',     detail: 'La propiedad se alquila a quien respondió más rápido.' },
        ],
        outcome: 'Lead perdido · propiedad que otro alquiló',
      },
      despues: {
        mensajeBot: '¡Hola! Sí, el depto de calle 13 sigue disponible. Son $580.000/mes, piso 3 con balcón. ¿Querés coordinar una visita? 🏠',
        hora: '18:55',
        pasos: [
          { icon: <IconRobot size={17} />,         tipo: 'green', label: 'Respuesta inmediata fuera de horario', detail: 'El asistente conoce todas las propiedades disponibles.' },
          { icon: <IconCalendarCheck size={17} />, tipo: 'green', label: 'Visita coordinada automáticamente',    detail: 'El interesado agenda la visita sin esperar al día siguiente.' },
          { icon: <IconHeart size={17} />,         tipo: 'green', label: 'El asesor llega con todo listo',       detail: 'Al otro día encuentra la visita agendada y los datos del cliente.' },
        ],
        outcome: 'Lead calificado · visita agendada sola',
      },
    },
    restaurant: {
      tab: '🍕 Restaurant',
      antes: {
        wappNombre: 'Zultano',
        wappInicial: 'Z',
        mensajeCliente: 'Hola! ¿Hacen delivery? ¿Cuál es el menú y hasta qué hora atienden?',
        hora: '20:15',
        pasos: [
          { icon: <IconToolsKitchen2 size={17} />, tipo: 'amber', label: 'El equipo está en hora pico',          detail: 'Viernes a la noche, todos en la cocina o atendiendo mesas.' },
          { icon: <IconMessageOff size={17} />,    tipo: 'red',   label: 'El WhatsApp suena y nadie responde',   detail: 'No hay tiempo de revisar el celular en el momento más ocupado.' },
          { icon: <IconUserOff size={17} />,       tipo: 'red',   label: 'El pedido va a otro lado',             detail: 'El cliente pide en la pizzería que sí le respondió.' },
        ],
        outcome: 'Pedido perdido · en el peor momento',
      },
      despues: {
        mensajeBot: '¡Hola! Sí hacemos delivery. Tenemos pizzas desde $16.000. Atendemos hasta las 23hs. ¿Te paso el menú completo? 🍕',
        hora: '20:15',
        pasos: [
          { icon: <IconRobot size={17} />,         tipo: 'green', label: 'Responde en el momento más ocupado',   detail: 'El asistente maneja todas las consultas mientras el equipo cocina.' },
          { icon: <IconCalendarCheck size={17} />, tipo: 'green', label: 'Menú, precios y horarios al instante', detail: 'Sin que nadie tenga que dejar lo que está haciendo.' },
          { icon: <IconHeart size={17} />,         tipo: 'green', label: 'Pedido confirmado automáticamente',    detail: 'El cliente recibe toda la info y hace su pedido sin fricción.' },
        ],
        outcome: 'Pedido confirmado · equipo enfocado',
      },
    },
}

type EscenarioKey = keyof typeof ESCENARIOS

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

function AnimatedStats() {
    const [started, setStarted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setStarted(true) },
        { threshold: 0.3 }
      )
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    }, [])
  
    const horas     = useCountUp({ from: 0,   to: 24, duration: 1800, started })
    const segundos  = useCountUp({ from: 120, to: 30, duration: 2000, started })
    const consultas = useCountUp({ from: 47,  to: 0,  duration: 2200, started })
  
    return (
      <div ref={containerRef} className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{horas}hs</div>
          <div className={styles.statLbl}>sin interrupciones</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{'<'} {segundos}s</div>
          <div className={styles.statLbl}>tiempo de respuesta</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{consultas}</div>
          <div className={styles.statLbl}>consultas sin atender</div>
        </div>
      </div>
    )
  }

export default function ComoFunciona() {
  const [activo, setActivo] = useState<EscenarioKey>('veterinaria')
  const escenario = ESCENARIOS[activo]

  return (
    <section className={styles.section} id="como-funciona">
      <div className={styles.inner}>

        <motion.div {...fadeUp}>
          <span className={styles.tag}>{'// 02 - cómo funciona'}</span>
          <h2 className={styles.title}>
            Tu equipo, enfocado en<br />lo que realmente importa.
          </h2>
          <p className={styles.subtitle}>
            Cada consulta de WhatsApp que queda sin respuesta es un cliente que se va.
            Nosotros lo resolvemos para que tu equipo pueda enfocarse en atender
            a quien tiene enfrente.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {(Object.keys(ESCENARIOS) as EscenarioKey[]).map(key => (
            <button
              key={key}
              className={`${styles.tab} ${activo === key ? styles.tabActive : ''}`}
              onClick={() => setActivo(key)}
            >
              {ESCENARIOS[key].tab}
            </button>
          ))}
        </div>

        {/* Escenario */}
        <motion.div
          key={activo}
          className={styles.scenario}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.scenarioHeader}>
            <div className={`${styles.colHeader} ${styles.colHeaderBefore}`}>
              <span className={`${styles.colDot} ${styles.dotRed}`} />
              Sin Gelab — hoy
            </div>
            <div className={`${styles.colHeader} ${styles.colHeaderAfter}`}>
              <span className={`${styles.colDot} ${styles.dotGreen}`} />
              Con Gelab — mañana
            </div>
          </div>

          <div className={styles.scenarioBody}>

            {/* ANTES */}
            <div className={`${styles.col} ${styles.colBefore}`}>
              <div className={styles.wapp}>
                <div className={styles.wappHeader}>
                  <div className={styles.wappAvatar}>{escenario.antes.wappInicial}</div>
                  <div>
                    <div className={styles.wappName}>{escenario.antes.wappNombre}</div>
                    <div className={styles.wappStatus}>en línea</div>
                  </div>
                </div>
                <div className={styles.wappBody}>
                  <div className={styles.bubbleReceived}>
                    {escenario.antes.mensajeCliente}
                    <div className={styles.bubbleTime}>{escenario.antes.hora}</div>
                  </div>
                  <div className={styles.bubblePending}>
                    Sin respuesta... ⏳
                    <div className={styles.bubbleTime}>{escenario.antes.hora}</div>
                  </div>
                </div>
              </div>

              {escenario.antes.pasos.map((paso, i) => (
                <div key={i} className={styles.step}>
                  <div className={`${styles.stepIcon} ${
                    paso.tipo === 'red'   ? styles.stepIconRed   :
                    paso.tipo === 'amber' ? styles.stepIconAmber :
                    styles.stepIconGreen
                  }`}>
                    {paso.icon}
                  </div>
                  <div>
                    <div className={styles.stepLabel}>{paso.label}</div>
                    <div className={styles.stepDetail}>{paso.detail}</div>
                  </div>
                </div>
              ))}

              <div className={`${styles.outcome} ${styles.outcomeBad}`}>
                <IconTrendingDown size={16} />
                {escenario.antes.outcome}
              </div>
            </div>

            {/* DESPUÉS */}
            <div className={styles.col}>
              <div className={styles.wapp}>
                <div className={styles.wappHeader}>
                  <div className={styles.wappAvatar}>{escenario.antes.wappInicial}</div>
                  <div>
                    <div className={styles.wappName}>{escenario.antes.wappNombre}</div>
                    <div className={styles.wappStatus}>en línea</div>
                  </div>
                </div>
                <div className={styles.wappBody}>
                  <div className={styles.bubbleReceived}>
                    {escenario.antes.mensajeCliente}
                    <div className={styles.bubbleTime}>{escenario.despues.hora}</div>
                  </div>
                  <div className={styles.bubbleSent}>
                    {escenario.despues.mensajeBot}
                    <div className={styles.bubbleTime}>{escenario.despues.hora}</div>
                  </div>
                </div>
              </div>

              {escenario.despues.pasos.map((paso, i) => (
                <div key={i} className={styles.step}>
                  <div className={`${styles.stepIcon} ${styles.stepIconGreen}`}>
                    {paso.icon}
                  </div>
                  <div>
                    <div className={styles.stepLabel}>{paso.label}</div>
                    <div className={styles.stepDetail}>{paso.detail}</div>
                  </div>
                </div>
              ))}

              <div className={`${styles.outcome} ${styles.outcomeGood}`}>
                <IconTrendingUp size={16} />
                {escenario.despues.outcome}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Mensaje clave */}
        <motion.div className={styles.keyMessage} {...fadeUp}>
            <IconBulb size={32} style={{ color: 'var(--lime)', flexShrink: 0, marginTop: '2px' }} />
          <p className={styles.keyText}>
            <strong>No reemplazamos a tu equipo.</strong> Le sacamos las tareas repetitivas
            para que pueda hacer mejor lo que solo un humano puede hacer: <strong>atender,
            cuidar y fidelizar clientes.</strong>
          </p>
        </motion.div>

        {/* Stats */}
        <AnimatedStats />

        {/* Flujo técnico */}
        <div className={styles.flow}>
        <div className={styles.flowTitle}>{'// el flujo — simplificado'}</div>
        <div className={styles.flowSteps}>
            {[
            { icon: <IconBrandWhatsapp size={22} />, label: 'Mensaje',    sub: 'cliente escribe',     hl: false },
            { icon: <IconArrowsExchange size={22}/>, label: 'Gelab',      sub: 'recibe y procesa',    hl: false },
            { icon: <IconRobot size={22} />,         label: 'IA',         sub: 'genera respuesta',    hl: true  },
            { icon: <IconSend size={22} />,          label: 'Respuesta',  sub: 'en segundos',         hl: false },
            { icon: <IconUsers size={22} />,         label: 'Tu equipo',  sub: 'sin interrupciones',  hl: false },
            ].map((s, i) => (
            <motion.div
                key={i}
                className={styles.flowStep}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
            >
                <div
                className={`${styles.flowStepIcon} ${s.hl ? styles.flowStepIconHl : ''}`}
                style={{ color: s.hl ? 'var(--lime)' : 'var(--muted)' }}
                >
                {s.icon}
                </div>
                <div className={styles.flowStepLabel}>{s.label}</div>
                <div className={styles.flowStepSub}>{s.sub}</div>
                <div className={styles.flowLine} />
            </motion.div>
            ))}
        </div>
        </div>

      </div>
    </section>
  )
}