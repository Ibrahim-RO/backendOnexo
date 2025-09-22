import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import DataUser from './DataUserModel';

@Table({
    tableName: "form_answers"
})

class FormAnswer extends Model {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare question: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare answer: string;

    @ForeignKey(() => DataUser)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare dataUserId: number;

    @BelongsTo(() => DataUser)
    declare dataUser: DataUser;
}

export default FormAnswer