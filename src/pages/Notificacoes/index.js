import React, {useState, useContext, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {getAll, remove} from '../../services/notifications';
import * as petService from '../../services/pet';
import * as userService from '../../services/user';
import AuthContext from '../../contexts/auth';
import {ListItem, Avatar, CheckBox} from 'react-native-elements';

const Notificacao = ({
  notification,
  navigation,
  notifications,
  setNotifications,
}) => {
  const [checked, setChecked] = useState(false);
  const [pet, setPet] = useState(null);
  const [sender, setSender] = useState(null);

  const loadData = async () => {
    const petRequest = await petService.get(notification.pet);
    const petData = await petRequest.data();
    setPet(petData);

    const senderRequest = await userService.get(notification.sender);
    const senderData = await senderRequest.data();
    setSender(senderData);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.warn(sender);
  console.warn(pet);

  return (
    <ListItem
      bottomDivider
      key={notification.id}
      onPress={() => navigation.navigate('Interessados', pet)}>
      {sender ? <Avatar rounded source={{uri: sender.photoFile}} /> : null}
      <ListItem.Content>
        {notification.type === 'adoptionIntention' ? (
          <View>
            <ListItem.Title>Intenção de Adotar</ListItem.Title>
            {sender ? (
              <ListItem.Subtitle>{`${sender.name} tem interesse em adotar ${pet.petName}`}</ListItem.Subtitle>
            ) : null}
          </View>
        ) : (
          <View />
        )}
      </ListItem.Content>
      <CheckBox
        title=""
        checked={checked}
        onPress={() => {
          Alert.alert(
            'Apagar a notificação',
            `Deseja apagar a notificação de ${sender.name}`,
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  remove(notification.id).then(() => {
                    setNotifications(
                      notifications.filter(
                        (noti) => noti.id !== notification.id,
                      ),
                    );
                  });
                },
              },
            ],
          );
        }}
      />
    </ListItem>
  );
};

export default function Notificacoes({navigation}) {
  const [notifications, setNotifications] = useState([]);
  const {user} = useContext(AuthContext);

  const loadData = async () => {
    const request = await getAll(user.uid);
    const data = await request.docs;
    setNotifications(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {notifications.map((notification) => (
        <View key={notification.id}>
          <Notificacao
            notification={{...notification.data(), id: notification.id}}
            navigation={navigation}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </View>
      ))}
    </View>
  );
}