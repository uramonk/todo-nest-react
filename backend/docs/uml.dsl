
classDiagram

class AppController{
            -appService: AppService
            +getHello() string
        }
class AppModule{
            
            
        }
class AppService{
            
            +getHello() string
        }
class PrismaService{
            
            +onModuleInit() Promise~void~
        }
PrismaClient~T,U,ExtArgs~<|--PrismaService
OnModuleInit<|..PrismaService
class AuthController{
            -authService: AuthService
            +login() Promise~{ access_token: string; }~
        }
class AuthModule{
            
            
        }
class AuthService{
            -usersService: UsersService
-jwtService: JwtService
            +validateUser() Promise~UserDto~
+login() Promise~{ access_token: string; }~
        }
class JwtAuthGuard{
            -reflector: Reflector
            +canActivate() boolean | Promise~boolean~ | Observable~boolean~
        }
class JwtPayload {
            <<interface>>
            +sub: number
+username: string
            
        }
class JwtStrategy{
            
            +validate() Promise~{ id: number; username: string; }~
        }
Strategy<|--JwtStrategy
class LocalAuthGuard{
            
            
        }
class LocalStrategy{
            -authService: AuthService
            +validate() Promise~any~
        }
Strategy<|--LocalStrategy
class ItemsController{
            -itemsService: ItemsService
            +findAll() Promise~ItemDto[]~
+findById() Promise~{ id: number; body: string; status: Status; userId: number; createdAt: Date; updatedAt: Date; }~
+create() Promise~ItemDto~
+updateToDoStatus() Promise~ItemDto~
+delete() Promise~void~
        }
class ItemsModule{
            
            
        }
class ItemsService{
            -prisma: PrismaService
            +findAll() Promise~{ id: number; body: string; status: Status; userId: number; createdAt: Date; updatedAt: Date; }[]~
+findById() Promise~{ id: number; body: string; status: Status; userId: number; createdAt: Date; updatedAt: Date; }~
+create() Promise~{ id: number; body: string; status: Status; userId: number; createdAt: Date; updatedAt: Date; }~
+update() Promise~{ id: number; body: string; status: Status; userId: number; createdAt: Date; updatedAt: Date; }~
+delete() Promise~void~
        }
class UserController{
            
            +getProfile() UserDto
        }
class UsersModule{
            
            
        }
class UsersService{
            -prisma: PrismaService
            +findOne() Promise~{ id: number; username: string; password: string; createdAt: Date; updatedAt: Date; }~
        }
class CreateItemDto{
            +body: string
+status: Status
            
        }
class ItemDto{
            +id: number
+body: string
+status: Status
+userId: number
+createdAt: Date
+updatedAt: Date
            
        }
class UpdateItemDto{
            +body: string
+status: Status
            
        }
class Configuration{
            -configuration: ConfigurationParameters
            
        }
class BaseAPI{
            -jsonRegex: RegExp$
-middleware: Middleware[]
-fetchApi: (url: string, init: RequestInit) =~ Promise~Response~
#configuration: Configuration
            +withMiddleware() T
+withPreMiddleware() T
+withPostMiddleware() T
#isJsonMime() boolean
#request() Promise~Response~
-createFetchParams() Promise~{ url: string; init: RequestInit; }~
-clone() T
        }
class ResponseError{
            +name: "ResponseError"
+response: Response
            
        }
class FetchError{
            +name: "FetchError"
+cause: Error
            
        }
class RequiredError{
            +name: "RequiredError"
+field: string
            
        }
class JSONApiResponse~T~{
            +raw: Response
-transformer: ResponseTransformer~T~
            +value() Promise~T~
        }
class VoidApiResponse{
            +raw: Response
            +value() Promise~void~
        }
class BlobApiResponse{
            +raw: Response
            +value() Promise~Blob~
        }
class TextApiResponse{
            +raw: Response
            +value() Promise~string~
        }
class ConfigurationParameters {
            <<interface>>
            +basePath?: string
+fetchApi?: (input: RequestInfo | URL, init?: RequestInit) =~ Promise~Response~
+middleware?: Middleware[]
+queryParamsStringify?: (params: HTTPQuery) =~ string
+username?: string
+password?: string
+apiKey?: string | Promise~string~ | ((name: string) =~ string | Promise~string~)
+accessToken?: string | Promise~string~ | ((name?: string, scopes?: string[]) =~ string | Promise~string~)
+headers?: HTTPHeaders
+credentials?: RequestCredentials
            
        }
class FetchParams {
            <<interface>>
            +url: string
+init: RequestInit
            
        }
class RequestOpts {
            <<interface>>
            +path: string
+method: HTTPMethod
+headers: HTTPHeaders
+query?: HTTPQuery
+body?: any
            
        }
class Consume {
            <<interface>>
            +contentType: string
            
        }
class RequestContext {
            <<interface>>
            +fetch: (input: RequestInfo | URL, init?: RequestInit) =~ Promise~Response~
+url: string
+init: RequestInit
            
        }
class ResponseContext {
            <<interface>>
            +fetch: (input: RequestInfo | URL, init?: RequestInit) =~ Promise~Response~
+url: string
+init: RequestInit
+response: Response
            
        }
class ErrorContext {
            <<interface>>
            +fetch: (input: RequestInfo | URL, init?: RequestInit) =~ Promise~Response~
+url: string
+init: RequestInit
+error: unknown
+response?: Response
            
        }
class Middleware {
            <<interface>>
            
            +pre() Promise~void | FetchParams~
+post() Promise~void | Response~
+onError() Promise~void | Response~
        }
class ApiResponse~T~ {
            <<interface>>
            +raw: Response
            +value() Promise~T~
        }
class ResponseTransformer~T~ {
            <<interface>>
            
            
        }
class HTTPHeaders {
            <<type>>
            
            
        }
class HTTPQuery {
            <<type>>
            
            
        }
class HTTPRequestInit {
            <<type>>
            +headers?: HTTPHeaders
+method: HTTPMethod
+credentials?: RequestCredentials
+body?: any
            
        }
class UserDto{
            +id: number
+username: string
+createdAt: Date
+updatedAt: Date
            
        }
class AppApi{
            
            +appControllerGetHelloRaw() Promise~ApiResponse~void~~
+appControllerGetHello() Promise~void~
+authControllerLoginRaw() Promise~ApiResponse~void~~
+authControllerLogin() Promise~void~
+findAllItemsRaw() Promise~ApiResponse~ItemDto[]~~
+findAllItems() Promise~ItemDto[]~
+itemsControllerCreateRaw() Promise~ApiResponse~void~~
+itemsControllerCreate() Promise~void~
+itemsControllerDeleteRaw() Promise~ApiResponse~void~~
+itemsControllerDelete() Promise~void~
+itemsControllerFindByIdRaw() Promise~ApiResponse~void~~
+itemsControllerFindById() Promise~void~
+itemsControllerUpdateToDoStatusRaw() Promise~ApiResponse~void~~
+itemsControllerUpdateToDoStatus() Promise~void~
+userControllerGetProfileRaw() Promise~ApiResponse~void~~
+userControllerGetProfile() Promise~void~
        }
class ItemsControllerCreateRequest {
            <<interface>>
            +createItemDto: CreateItemDto
            
        }
class ItemsControllerDeleteRequest {
            <<interface>>
            +id: number
            
        }
class ItemsControllerFindByIdRequest {
            <<interface>>
            +id: number
            
        }
class ItemsControllerUpdateToDoStatusRequest {
            <<interface>>
            +id: number
+updateItemDto: UpdateItemDto
            
        }
BaseAPI<|--AppApi
class CreateItemDto {
            <<interface>>
            +body: string
+status: string
            
        }
class ItemDto {
            <<interface>>
            +id: number
+body: string
+status: string
+userId: number
+createdAt: Date
+updatedAt: Date
            
        }
class UpdateItemDto {
            <<interface>>
            +body: string
+status: string
            
        }