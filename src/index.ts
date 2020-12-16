interface CatchConfig {
    /**
     * 自定义搜索引擎。若配置该项将覆盖默认配置。
     * 例如：https://cn.bing.com/search?q=[key]
     *
     * @type {string}
     */
    searchEngines?: string
    /**
     * 自定义错误处理方式。若配置该项将忽略 searchEngines 配置
     *
     */
    // eslint-disable-next-line no-unused-vars
    callback?: (error: unknown) => any
}

function openNewWindow(url: string) {
    return window.open(url)
}

function getLanguage() {
    const language = navigator.language
    if (/zh|cn|han/i.test(language)){
        return 'zh'
    }
    return 'en'
}

function openSearchEngines(errorMessage: string) {
    const language = getLanguage()
    switch (language) {
        case 'zh':
            return openNewWindow(`https://www.baidu.com/s?wd=${errorMessage}`)
        default:
            return openNewWindow(`https://www.google.com/search?&q=${errorMessage}`)
    }
}

/**
 * 捕获异常。本函数只能工作在浏览器环境
 *
 * @author CaoMeiYouRen
 * @date 2020-12-16
 * @export
 * @param {() => any} cb
 */
export async function funnyCatchError(cb: () => any, config?: CatchConfig) {
    try {
        await cb()
    } catch (error) {
        if (!window){
            throw error
        }
        let errorMessage: string
        if (error instanceof Error){
            errorMessage = error.message
        } else if (typeof error === 'string'){
            errorMessage = error
        }
        if (errorMessage){
            if (config?.callback){
                config.callback(error)
                return
            }
            console.error(error)
            if (config?.searchEngines){
                const url = config.searchEngines.replace('[key]', errorMessage)
                openNewWindow(url)
                return
            }
            openSearchEngines(errorMessage)
            return
        }
        throw error
    }
}