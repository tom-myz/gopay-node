abstract class Format {
    abstract mime: FormatMime
    abstract parseBody(body: string): any
    abstract parseParams(params: any): any
}
