import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import { Fontisto } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { Center, Icon, Text } from "native-base";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        mt={12}
        onPress={signIn}
        type="SECONDARY"
        isLoading={isUserLoading}
        _loading={{
          _spinner: {
            color: "white",
          },
        }}
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
      />
      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
