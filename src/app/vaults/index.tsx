import { styles } from "./styles";
import { useState } from "react";
import { padding } from "helpers/styles";
import { FlatList, View } from "react-native";
import { ArrowUp } from "phosphor-react-native";
import { Container } from "components/_ui/custom";
import Searchbar from "components/_common/Searchbar";
import { RgText, Text } from "components/_ui/typography";

const Vaults = () => {
  const [search, setSearch] = useState("");

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <View
        style={[
          {
            gap: 4,
            flexDirection: "row",
            alignItems: "center",
            ...padding(14, 16, 10),
            justifyContent: "space-between",
          },
        ]}
      >
        <Searchbar value={search} onFocus={() => {}} onChangeText={setSearch} />
      </View>

      <View style={[styles.content]}>
        <View style={{ marginBottom: 10 }}>
          <RgText style={{ fontSize: 24, color: "#999" }}>Transactions</RgText>
        </View>

        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const touchdown = item % 3 == 0;

            return (
              <View
                style={{
                  gap: 12,
                  flexDirection: "row",

                  borderRadius: 18,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  backgroundColor: "#151515",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 48,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#282828",
                  }}
                >
                  {/* <AppLogo size={26} /> */}
                  <ArrowUp size={20} color="#fff" />
                </View>

                <View
                  style={{
                    gap: 9,
                    flex: 1,
                    flexDirection: "column",
                    // backgroundColor: "blue",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <RgText style={{ fontSize: 16 }}>Send</RgText>

                    <View
                      style={{
                        borderRadius: 8,
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        flexDirection: "row",
                        backgroundColor: touchdown ? "#F69D7F" : "#8EC8FA",
                      }}
                    >
                      {touchdown ? (
                        <RgText style={{ color: "#000", fontSize: 12 }}>
                          Awaiting confirmation
                        </RgText>
                      ) : (
                        <RgText style={{ color: "#000", fontSize: 12 }}>
                          Needs your confirmation
                        </RgText>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <RgText style={{ fontSize: 14, color: "#89919e" }}>
                      27 mins ago
                    </RgText>
                    <Text>50%</Text>
                  </View>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 14, width: "100%" }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        />
      </View>
    </Container>
  );
};

export default Vaults;
