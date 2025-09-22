import { Table, Column, DataType, AllowNull, Model, HasMany } from 'sequelize-typescript'
import FormAnswer from './FormAnswersModel'

@Table({
    tableName: 'data_user'
})

class DataUser extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare lastname: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare maternalsurname: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare company: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare position: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(80)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare phone: string

    @HasMany(() => FormAnswer)
    declare answers: FormAnswer[];
}

export default DataUser
