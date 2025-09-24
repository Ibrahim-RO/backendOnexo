import { STRING } from 'sequelize'
import { Table, Column, DataType, Model, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'contact'
})

class Contact extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare lastname: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare maternalsurname: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare email: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare phone: string

}

export default Contact