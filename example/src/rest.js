import rest from 'rest'
import params from 'rest/interceptor/params'
import mime from 'rest/interceptor/mime'
import defaultRequest from 'rest/interceptor/defaultRequest'
import errorCode from 'rest/interceptor/errorCode'

export default rest.wrap(params).wrap(mime).wrap(defaultRequest).wrap(errorCode)
