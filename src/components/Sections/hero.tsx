import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config.ts'
import Image from 'next/image'
import classes from './hero.module.css'
import VerticalText from './verticalText'

const fullConfig = resolveConfig(tailwindConfig)

export default function Hero() {
    return (
        <div className="md:grid md:grid-cols-2 md:mt-16 mt-8 min-h-[85dvh] flex flex-col gap-10 md:gap-0 overflow-x-hidden">
            <div className="md:flex md:gap-6 md:pl-[30%] md:pr-0 mx-auto max-w-[80vw] w-auto"> 
                <VerticalText />
                <div className="mt-12 md:text-left text-center max-w-[600px]">
                    <h2 className="md:text-6xl text-5xl">web developer</h2>
                    <p className="md:text-4xl text-3xl mt-2 leading-[90%]" style={{
                            background: "linear-gradient( #E2E2E2, #929292)",
                            backgroundClip: "text"
                        }}>
                        <span className="text-transparent">Hi, I'm Sebastian, a full-stack web developer who adds a touch of the </span>
                        <span className="text-accent-red" style={{
                            textShadow: "0 0 8px " + fullConfig.theme.colors['accent-red']
                        }}>mystical</span>
                    </p>
                </div>
            </div>
            <div className='min-h-[400px] md:pr-[10%] grid md:grid-cols-1 grid-cols-2 grid-rows-1 place-items-end md:gap-0 gap-[70%] xl:place-self-auto place-self-center md:translate-y-0 translate-y-[-50px]'>
                <Image 
                    src={"/IMGTop.webp"}
                    alt='Ink mountain'
                    width={600}
                    height={600}
                    className={`[--scale:-1] md:[--scale:1] md:col-start-1 md:row-start-1 md:w-[60%] md:mb-[16vw] max-w-[100vw] md:place-self-auto place-self-center ${classes.floating} ${classes.stagger1} pointer-events-none`}
                    priority={true}
                />
                <Image 
                    src={"/IMGLeft.webp"}
                    alt='Ink mountain'
                    width={400}
                    height={400}
                    className={`hidden md:block md:col-start-1 md:row-start-1 md:w-[60%] md:mb-[2vw] md:mr-[15vw] ${classes.floating} ${classes.stagger2} pointer-events-none`}
                    priority={true}
                />
                <Image 
                    src={"/IMGBase.webp"}
                    alt='Ink mountain'
                    width={600}
                    height={600}
                    className={`md:col-start-1 md:row-start-1 md:w-[60%] max-w-[100vw] md:place-self-auto place-self-center ${classes.floating} ${classes.stagger3} pointer-events-none`}
                    priority={true}
                />
            </div>
        </div>
    )
}