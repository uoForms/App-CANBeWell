declare namespace Cypress {
    interface Chainable<Subject> {
        assertVisibleAndContainText(text)

        assertAttribute(attrKey, attrValue)

        assertUrl(url, requestType, expectedStatusCode)

        getTestId(id)


        assertImageVisibleWithSource(source)

        setupCookies(cookies)

        checkGAQueryParams(queryDict)
    }
}