interface CatchConfig {
    /**
     * 自定义搜索引擎。若配置该项将覆盖默认配置。[key] 会被替换为具体 errorMessage
     * 例如：https://cn.bing.com/search?q=[key]
     *
     * @type {string}
     */
    searchEngines?: string
    /**
     * 是否打开新的窗口
     *
     * @type {boolean}
     */
    isOpenNewWindow?: boolean
}

interface SearchConfig extends CatchConfig {
    /**
     * 错误信息
     *
     * @type {string}
     */
    errorMessage: string
}
/**
 * 跳转新的窗口或页面
 *
 * @author CaoMeiYouRen
 * @date 2020-12-17
 * @param {string} url 要跳转的路径
 * @param {boolean} [open] 是否打开新的窗口
 * @returns
 */
function openNewWindow(url: string, open?: boolean) {
    if (open){
        return window.open(url)
    }
    window.location.href = url
    return window
}

function getLanguage() {
    const language = navigator.language
    if (/zh|cn|han/i.test(language)){
        return 'zh'
    }
    return 'en'
}

function openSearchEngines(config: SearchConfig) {
    const { errorMessage, searchEngines, isOpenNewWindow } = config
    const language = getLanguage()
    // 如果定义了 isOpenNewWindow 则按 isOpenNewWindow，未定义则中文环境 open ，英文环境不 open
    const open = typeof isOpenNewWindow === 'boolean' ? isOpenNewWindow : language === 'zh'
    let url = ''
    if (searchEngines){
        url = searchEngines.replace('[key]', errorMessage)
    } else {
        switch (language) {
            case 'zh':
                url = `https://www.baidu.com/s?wd=${errorMessage}`
                break
            default:
                url = `https://www.google.com/search?&q=${errorMessage}`
                break
        }
    }
    return openNewWindow(url, open)
}

/**
 * 捕获异常。本函数只能工作在浏览器环境
 *
 * @author CaoMeiYouRen
 * @date 2020-12-17
 * @export
 * @param {() => any} cb 要执行的函数，支持异步函数
 * @param {CatchConfig} [config={}] 配置项
 */
export async function funnyCatchError(cb: () => any, config: CatchConfig = {}) {
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
            console.error(error)
            openSearchEngines({ ...config, errorMessage })
            return
        }
        throw error
    }
}