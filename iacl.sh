

#!/bin/bash

echo "Criando diretórios.."

mkdir /publico
mkdir /adm
mkdir /ven
mkdir /sec

echo "Criando grupos de usuários..."

groupadd GRP_ADM
groupadd GRP_VEN
groupadd GRP_SEC

echo "Criando usuários.."

useradd carlos -m -s /bin/bash -p $(openssl passwd -1 Senha123) -G GRP_ADM
useradd Maria -m -s /bin/bash -p $(openssl passwd -1 Senha123) -G GRP_ADM
useradd Joao -m -s /bin/bash -p $(openssl passwd -1 Senha123) -G GRP_VEN

useradd debora -m -s /bin/bash -p $(openssl passwd -1 Senha123) -G GRP_SEC
useradd sebastiana -m -s /bin/bash -p $(openssl passwd -1 Senha123) -G GRP_SEC

echo "Especificando permissões dos diretórios.."

chown root:GRP_ADM /adm
chown root:GRP_VEN /ven
chown root:GRP_SEC /sec

chmod 770 /adm
chmod 770 /ven
chmod 770 /sec

echo "Fim..."
