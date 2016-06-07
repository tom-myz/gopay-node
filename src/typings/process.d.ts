declare namespace nodeProcess {

    interface Process {
        title: string
        browser: boolean
        env: { [key: string]: string }
        argv: Array<string>
        version: string
        versions: { [key: string]: string }
        nextTick(fun: Function): void
        on(): void
        addListener(): void
        once(): void
        off(): void
        removeListener(): void
        removeAllListeners(): void
        emit(): void
        binding(): void
        cwd(): string
        chdir(): void
        umask(): number
    }

    export const process: Process
}

declare module "process" {
    export type process = nodeProcess.Process
}
