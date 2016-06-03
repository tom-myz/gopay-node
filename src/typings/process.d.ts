declare namespace nodeProcess {
    
    interface Process {
        nextTick(fun: Function): void
        title: string
        browser: boolean
        env: { [key: string]: string }
        argv: Array<string>
        version: string
        versions: { [key: string]: string }
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
    
    const Process: Process
}

declare module "process" {
    export type process = nodeProcess.Process
}
